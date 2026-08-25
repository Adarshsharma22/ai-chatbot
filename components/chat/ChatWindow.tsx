"use client";

import { useState } from "react";

import Header from "@/components/Header";
import MessageList from "@/components/chat/MessageList";
import ChatInput from "@/components/chat/ChatInput";
import Sidebar from "@/components/sidebar/Sidebar";

import type { Message } from "@/types/chat";

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = (content: string) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      newMessage,
    ]);
  };

  return (
    <div className="flex h-screen bg-gray-950 text-white">
    <Sidebar onNewChat={() => setMessages([])} />

      <main className="flex min-w-0 flex-1 flex-col">
        <Header />

        <MessageList messages={messages} />

        <ChatInput onSend={handleSend} />
      </main>
    </div>
  );
}