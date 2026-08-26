"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import MessageList from "@/components/chat/MessageList";
import ChatInput from "@/components/chat/ChatInput";
import Sidebar from "@/components/sidebar/Sidebar";

import type { Chat, Message } from "@/types/chat";
import { getChats, saveChats } from "@/lib/chat-storage";

export default function ChatWindow() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(false);

  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  // Load chats when the application starts
  useEffect(() => {
    const storedChats = getChats();

    setChats(storedChats);

    if (storedChats.length > 0) {
      setActiveChatId(storedChats[0].id);
    }
  }, []);

  const activeChat = chats.find(
    (chat) => chat.id === activeChatId
  );

  const messages = activeChat?.messages ?? [];

  const updateChatMessages = (
  chatId: string,
  updateMessages: Message[] | ((current: Message[]) => Message[])
) => {
  setChats((currentChats) => {
    const updatedChats = currentChats.map((chat) => {
      if (chat.id !== chatId) {
        return chat;
      }

      const newMessages =
        typeof updateMessages === "function"
          ? updateMessages(chat.messages)
          : updateMessages;

      return {
        ...chat,
        messages: newMessages,
        updatedAt: Date.now(),
      };
    });

    saveChats(updatedChats);

    return updatedChats;
  });
};

  const handleNewChat = () => {
    if (isLoading) return;

    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setChats((currentChats) => {
      const updatedChats = [newChat, ...currentChats];

      saveChats(updatedChats);

      return updatedChats;
    });

    setActiveChatId(newChat.id);
  };

  const handleSend = async (content: string) => {
    if (isLoading) return;

    let chatId = activeChatId;

    // Automatically create a chat if none exists
    if (!chatId) {
      const newChat: Chat = {
        id: crypto.randomUUID(),
        title: content.slice(0, 40),
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      setChats([newChat]);
      saveChats([newChat]);

      setActiveChatId(newChat.id);

      chatId = newChat.id;
    }

    const currentChat = chats.find(
      (chat) => chat.id === chatId
    );

    const currentMessages = currentChat?.messages ?? [];

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    const updatedMessages = [
      ...currentMessages,
      userMessage,
    ];

    updateChatMessages(chatId, updatedMessages);

    setIsLoading(true);

    const controller = new AbortController();

    setAbortController(controller);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      if (!response.body) {
        throw new Error("Response body is empty");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      const assistantMessageId = crypto.randomUUID();

      const assistantMessage: Message = {
        id: assistantMessageId,
        role: "assistant",
        content: "",
      };

      updateChatMessages(chatId, [
        ...updatedMessages,
        assistantMessage,
      ]);

      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, {
          stream: true,
        });

        assistantContent += chunk;

        updateChatMessages(chatId, (currentMessages) => {
        return currentMessages.map((message) =>
            message.id === assistantMessageId
            ? {
                ...message,
                content: assistantContent,
                }
            : message
        );
        });
      }
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      console.error("Chat error:", error);

      const currentChatMessages =
        chats.find((chat) => chat.id === chatId)?.messages ??
        updatedMessages;

      updateChatMessages(chatId, [
        ...currentChatMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setAbortController(null);
    }
  };

  const handleStop = () => {
    abortController?.abort();
  };

  const handleSelectChat = (chatId: string) => {
    if (isLoading) return;

    setActiveChatId(chatId);
  };

  const handleDeleteChat = (chatId: string) => {
  if (isLoading) return;

  setChats((currentChats) => {
    const updatedChats = currentChats.filter(
      (chat) => chat.id !== chatId
    );

    saveChats(updatedChats);

    return updatedChats;
  });

  if (activeChatId === chatId) {
    const remainingChats = chats.filter(
      (chat) => chat.id !== chatId
    );

    setActiveChatId(
      remainingChats.length > 0
        ? remainingChats[0].id
        : null
    );
  }
};

const handleRenameChat = (
  chatId: string,
  title: string
) => {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) return;

  setChats((currentChats) => {
    const updatedChats = currentChats.map((chat) =>
      chat.id === chatId
        ? {
            ...chat,
            title: trimmedTitle,
            updatedAt: Date.now(),
          }
        : chat
    );

    saveChats(updatedChats);

    return updatedChats;
  });
};

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onRenameChat={handleRenameChat}
      />

      <main className="flex min-w-0 flex-1 flex-col">
        <Header />

        <MessageList
          messages={messages}
          isLoading={isLoading}
        />

        <ChatInput
          onSend={handleSend}
          disabled={isLoading}
          onStop={handleStop}
        />
      </main>
    </div>
  );
}