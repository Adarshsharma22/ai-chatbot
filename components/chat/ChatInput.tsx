"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";

type ChatInputProps = {
  onSend: (message: string) => void;
  disabled?: boolean;
  onStop?: () => void;
};

export default function ChatInput({
  onSend,
  disabled = false,
  onStop,
}: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    const message = input.trim();

    if (!message || disabled) return;

    onSend(message);
    setInput("");
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-800 p-4">
      <div className="mx-auto flex max-w-3xl items-end gap-3 rounded-2xl border border-gray-700 bg-gray-900 p-2">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            disabled ? "AI is thinking..." : "Ask anything..."
          }
          disabled={disabled}
          rows={1}
          className="min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
        />

        {disabled ? (
        <button
            onClick={onStop}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-black transition hover:bg-gray-200"
            aria-label="Stop generating"
        >
            <div className="h-3 w-3 rounded-sm bg-black" />
        </button>
        ) : (
        <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send message"
        >
            <ArrowUp size={18} />
        </button>
        )}
      </div>

      <p className="mt-2 text-center text-xs text-gray-500">
        AI can make mistakes. Check important information.
      </p>
    </div>
  );
}