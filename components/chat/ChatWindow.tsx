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
    messages: Message[]
  ) => {
    setChats((currentChats) => {
      const updatedChats = currentChats.map((chat) => {
        if (chat.id !== chatId) {
          return chat;
        }

        return {
          ...chat,
          messages,
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

        const currentChatMessages =
          chats.find((chat) => chat.id === chatId)?.messages ??
          updatedMessages;

        updateChatMessages(chatId, [
          ...currentChatMessages.filter(
            (message) =>
              message.id !== assistantMessageId
          ),
          {
            id: assistantMessageId,
            role: "assistant",
            content: assistantContent,
          },
        ]);
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

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
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