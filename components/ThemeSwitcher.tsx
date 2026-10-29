"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Palette } from "lucide-react";

import { THEME_ORDER, THEMES, useTheme } from "@/context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] transition-colors duration-200 hover:border-[var(--border-strong)] hover:text-[var(--accent-solid)] sm:h-10 sm:w-10"
        aria-label="Change theme"
      >
        <Palette size={17} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-sidebar)] p-2 shadow-2xl backdrop-blur-xl"
          >
            <p className="mb-1.5 px-2 pt-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Choose a theme
            </p>

            <div className="space-y-0.5">
              {THEME_ORDER.map((name) => {
                const isActive = theme === name;
                return (
                  <motion.button
                    key={name}
                    whileHover={{ x: 3 }}
                    onClick={() => {
                      setTheme(name);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-xs font-medium transition-colors duration-150 ${
                      isActive
                        ? "bg-[var(--bg-active)] text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]"
                    }`}
                  >
                    <span
                      className={`h-4 w-4 shrink-0 rounded-full shadow-sm ${THEMES[name].swatch}`}
                    />
                    <span className="flex-1">{THEMES[name].label}</span>
                    {isActive && (
                      <Check
                        size={13}
                        className="shrink-0 text-[var(--accent-solid)]"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}   