"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";

import type { Message } from "@/types/chat";
import MessageBubble from "@/components/chat/MessageBubble";
import EmptyChat from "@/components/chat/EmptyChat";
import TypingIndicator from "@/components/chat/TypingIndicator";

type MessageListProps = {
  messages: Message[];
  isLoading: boolean;
  onSuggestionClick?: (text: string) => void;
};

export default function MessageList({
  messages,
  isLoading,
  onSuggestionClick,
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
        <EmptyChat onSuggestionClick={onSuggestionClick} />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto [scrollbar-width:thin]">
      <div className="mx-auto max-w-3xl px-3 py-6 sm:px-4 sm:py-8">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>

        {isLoading && <TypingIndicator />}

        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
}