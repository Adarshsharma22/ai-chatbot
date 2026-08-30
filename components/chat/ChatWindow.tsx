"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import Header from "@/components/Header";
import MessageList from "@/components/chat/MessageList";
import ChatInput from "@/components/chat/ChatInput";
import Sidebar from "@/components/sidebar/Sidebar";
import { ThemeProvider } from "@/context/ThemeContext";

import type { Chat, Message } from "@/types/chat";

function ChatWindowInner() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isChatsLoading, setIsChatsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  // Load chats from MongoDB
  useEffect(() => {
    const loadChats = async () => {
      try {
        const response = await fetch("/api/chats");

        if (!response.ok) {
          throw new Error("Failed to load chats");
        }

        const data = await response.json();

        setChats(data);

        if (data.length > 0) {
          setActiveChatId(data[0]._id);
        }
      } catch (error) {
        console.error("Failed to load chats:", error);
      } finally {
        setIsChatsLoading(false);
      }
    };

    loadChats();
  }, []);

  const activeChat = chats.find((chat) => chat._id === activeChatId);
  const messages = activeChat?.messages ?? [];

  // Create new chat
  const handleNewChat = async () => {
    if (isLoading) return;

    try {
      const response = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Chat" }),
      });

      if (!response.ok) {
        throw new Error("Failed to create chat");
      }

      const newChat = await response.json();

      setChats((currentChats) => [newChat, ...currentChats]);
      setActiveChatId(newChat._id);
      setIsSidebarOpen(false);
    } catch (error) {
      console.error("Failed to create chat:", error);
    }
  };

  // Select chat
  const handleSelectChat = (chatId: string) => {
    if (isLoading) return;

    setActiveChatId(chatId);
    setIsSidebarOpen(false);
  };

  // Update chat in MongoDB
  const updateChat = async (
    chatId: string,
    updates: { title?: string; messages?: Message[] }
  ) => {
    const response = await fetch(`/api/chats/${chatId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error("Failed to update chat");
    }

    const updatedChat = await response.json();

    setChats((currentChats) =>
      currentChats.map((chat) => (chat._id === chatId ? updatedChat : chat))
    );

    return updatedChat;
  };

  // Delete chat
  const handleDeleteChat = async (chatId: string) => {
    if (isLoading) return;

    try {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete chat");
      }

      setChats((currentChats) =>
        currentChats.filter((chat) => chat._id !== chatId)
      );

      if (activeChatId === chatId) {
        const remainingChats = chats.filter((chat) => chat._id !== chatId);

        setActiveChatId(
          remainingChats.length > 0 ? remainingChats[0]._id : null
        );
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  // Rename chat
  const handleRenameChat = async (chatId: string, title: string) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    try {
      await updateChat(chatId, { title: trimmedTitle });
    } catch (error) {
      console.error("Failed to rename chat:", error);
    }
  };

  // Send message
  const handleSend = async (content: string) => {
    if (isLoading) return;

    let chatId = activeChatId;

    try {
      // Create chat if none exists
      if (!chatId) {
        const createResponse = await fetch("/api/chats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: content.slice(0, 40) }),
        });

        if (!createResponse.ok) {
          throw new Error("Failed to create chat");
        }

        const newChat = await createResponse.json();

        setChats((currentChats) => [newChat, ...currentChats]);
        setActiveChatId(newChat._id);

        chatId = newChat._id;
      }

      if (!chatId) return;

      const currentChat = chats.find((chat) => chat._id === chatId);
      const currentMessages = currentChat?.messages ?? [];

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content,
      };

      const updatedMessages = [...currentMessages, userMessage];

      // Save user message
      await updateChat(chatId, { messages: updatedMessages });

      setIsLoading(true);

      const controller = new AbortController();
      setAbortController(controller);

      // Send message to AI backend
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();

      if (!data.message || typeof data.message !== "string") {
        throw new Error("Invalid AI response");
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.message,
      };

      const finalMessages = [...updatedMessages, assistantMessage];

      // Save complete conversation
      await updateChat(chatId, { messages: finalMessages });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      console.error("Chat error:", error);

      if (chatId) {
        try {
          const latestResponse = await fetch(`/api/chats/${chatId}`);
          const latestChat = await latestResponse.json();

          await updateChat(chatId, {
            messages: [
              ...latestChat.messages,
              {
                id: crypto.randomUUID(),
                role: "assistant",
                content: "Sorry, something went wrong. Please try again.",
              },
            ],
          });
        } catch (saveError) {
          console.error("Failed to save error message:", saveError);
        }
      }
    } finally {
      setIsLoading(false);
      setAbortController(null);
    }
  };

  const handleStop = () => {
    abortController?.abort();
  };

  const handleClearChats = async () => {
    if (isLoading) return;

    const confirmed = window.confirm("Delete all chats?");
    if (!confirmed) return;

    try {
      const response = await fetch("/api/chats", { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to delete all chats");
      }

      setChats([]);
      setActiveChatId(null);
    } catch (error) {
      console.error("Failed to clear chats:", error);
    }
  };

  if (isChatsLoading) {
    return (
      <div
        className="flex h-screen items-center justify-center text-[var(--text-primary)]"
        style={{ backgroundColor: "var(--bg-solid)" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <Loader2 className="h-6 w-6 animate-spin text-[var(--accent-solid)]" />
          <p className="text-xs font-medium tracking-wide text-[var(--text-muted)]">
            Loading conversations...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="flex h-screen overflow-hidden text-[var(--text-primary)] antialiased"
      style={{ backgroundColor: "var(--bg-solid)" }}
    >
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onRenameChat={handleRenameChat}
        onClearChats={handleClearChats}
      />

      <main
        className="relative flex min-w-0 flex-1 flex-col"
        style={{
          background: `linear-gradient(to bottom, var(--bg-app-from), var(--bg-app-via), var(--bg-app-to))`,
        }}
      >
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

        <MessageList
          messages={messages}
          isLoading={isLoading}
          onSuggestionClick={(text) => handleSend(text)}
        />

        <ChatInput onSend={handleSend} disabled={isLoading} onStop={handleStop} />
      </main>
    </div>
  );
}

export default function ChatWindow() {
  return (
    <ThemeProvider>
      <ChatWindowInner />
    </ThemeProvider>
  );
}