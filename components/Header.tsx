"use client";

import { Bot, Menu } from "lucide-react";
import { motion } from "framer-motion";

import ThemeSwitcher from "@/components/ThemeSwitcher";

type HeaderProps = {
  onOpenSidebar?: () => void;
};

export default function Header({ onOpenSidebar }: HeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-header)] px-3 backdrop-blur-xl sm:h-16 sm:px-6">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <button
          onClick={onOpenSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--text-secondary)] transition hover:bg-[var(--bg-card-hover)] md:hidden"
          aria-label="Open menu"
        >
          <Menu size={19} />
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-[var(--accent-from)] to-[var(--accent-to)] text-[var(--accent-text)] shadow-md sm:h-9 sm:w-9"
        >
          <Bot size={18} strokeWidth={2.5} />
        </motion.div>

        <div>
          <h1 className="text-sm font-semibold text-[var(--text-primary)]">
            AI Chatbot
          </h1>
          <p className="hidden text-[11px] font-medium text-[var(--text-muted)] sm:block">
            Assistant Engine
          </p>
        </div>
      </div>

      <ThemeSwitcher />
    </header>
  );
}