"use client";

import { useEffect, useRef } from "react";

import type { Message } from "@/types/chat";
import MessageBubble from "@/components/chat/MessageBubble";
import EmptyChat from "@/components/chat/EmptyChat";
import TypingIndicator from "@/components/chat/TypingIndicator";

type MessageListProps = {
  messages: Message[];
  isLoading: boolean;
};

export default function MessageList({
  messages,
  isLoading,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto">
        <EmptyChat />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-3xl px-4 py-6">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}

        {isLoading && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}