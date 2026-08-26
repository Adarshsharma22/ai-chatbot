"use client";

import { useState } from "react";
import {
  Bot,
  Check,
  Copy,
  User,
} from "lucide-react";

import type { Message } from "@/types/chat";

type MessageBubbleProps = {
  message: Message;
};

export default function MessageBubble({
  message,
}: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);

  const isUser = message.role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        message.content
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div
      className={`mb-6 flex gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-black">
          <Bot size={17} />
        </div>
      )}

      <div className="max-w-[80%]">
        <div
          className={`rounded-2xl px-4 py-3 text-sm ${
            isUser
              ? "bg-white text-black"
              : "bg-gray-900 text-gray-200"
          }`}
        >
          {message.content}
        </div>

        {!isUser && message.content && (
          <button
            onClick={handleCopy}
            className="mt-2 flex items-center gap-1.5 text-xs text-gray-500 transition hover:text-white"
          >
            {copied ? (
              <>
                <Check size={14} />
                Copied
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-800">
          <User size={17} />
        </div>
      )}
    </div>
  );
}