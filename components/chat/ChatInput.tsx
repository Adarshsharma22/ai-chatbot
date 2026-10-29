"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Square } from "lucide-react";

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
    <div className="shrink-0 border-t border-[var(--border)] bg-[var(--bg-panel)] p-3 backdrop-blur-xl sm:p-4">
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-input)] p-2 shadow-xl transition-all duration-200 focus-within:ring-2 focus-within:ring-[var(--ring)] sm:gap-3 sm:p-2.5">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "AI is thinking..." : "Ask anything..."}
          disabled={disabled}
          rows={1}
          className="min-h-[40px] flex-1 resize-none bg-transparent px-2.5 py-2 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-[44px] sm:px-3"
        />

        <AnimatePresence mode="wait" initial={false}>
          {disabled ? (
            <motion.button
              key="stop"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              onClick={onStop}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-card)] text-[var(--text-secondary)] transition duration-200 hover:bg-[var(--danger-bg)] hover:text-[var(--danger)] active:scale-95"
              aria-label="Stop generating"
            >
              <Square size={16} className="fill-current" />
            </motion.button>
          ) : (
            <motion.button
              key="send"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
              onClick={handleSend}
              disabled={!input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[var(--accent-from)] to-[var(--accent-to)] text-[var(--accent-text)] transition duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Send message"
            >
              <ArrowUp size={18} strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-2 text-center text-[10px] font-medium tracking-wide text-[var(--text-muted)] sm:mt-2.5 sm:text-[11px]">
        AI can make mistakes. Verify important information.
      </p>
    </div>
  );
}