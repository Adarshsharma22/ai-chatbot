"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mb-6 flex gap-2.5 sm:gap-3.5"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[var(--accent-from)] to-[var(--accent-to)] text-[var(--accent-text)] shadow-md sm:h-9 sm:w-9">
        <Bot size={16} strokeWidth={2.5} className="sm:hidden" />
        <Bot size={18} strokeWidth={2.5} className="hidden sm:block" />
      </div>

      <div
        className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-[var(--border)] px-4 py-3.5 backdrop-blur-md"
        style={{ backgroundColor: "var(--bg-bubble-assistant)" }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: "var(--accent-solid)" }}
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}