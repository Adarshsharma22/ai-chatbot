"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

type EmptyChatProps = {
  onSuggestionClick?: (text: string) => void;
};

const SUGGESTIONS = [
  "Explain a concept simply",
  "Help me debug some code",
  "Draft an email for me",
  "Brainstorm ideas with me",
];

export default function EmptyChat({ onSuggestionClick }: EmptyChatProps) {
  return (
    <div className="flex h-full items-center justify-center px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-center"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[var(--accent-from)] to-[var(--accent-to)] text-[var(--accent-text)] shadow-lg sm:h-16 sm:w-16"
        >
          <Bot size={28} strokeWidth={2} className="sm:hidden" />
          <Bot size={32} strokeWidth={2} className="hidden sm:block" />
        </motion.div>

        <h2 className="text-lg font-semibold tracking-tight text-[var(--text-primary)] sm:text-xl">
          How can I help you today?
        </h2>

        <p className="mt-2 text-xs text-[var(--text-muted)] sm:text-sm">
          Ask anything to get started with your conversation.
        </p>

        {onSuggestionClick && (
          <div className="mx-auto mt-6 grid max-w-md grid-cols-1 gap-2 sm:grid-cols-2">
            {SUGGESTIONS.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.06 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSuggestionClick(suggestion)}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-3.5 py-2.5 text-left text-xs font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}