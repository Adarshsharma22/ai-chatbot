"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeName =
  | "midnight"
  | "snow"
  | "crimson"
  | "sky"
  | "blossom"
  | "aurora";

type ThemeDefinition = {
  label: string;
  swatch: string; // tailwind gradient classes for the picker dot
  vars: Record<string, string>;
};

export const THEME_ORDER: ThemeName[] = [
  "midnight",
  "snow",
  "crimson",
  "sky",
  "blossom",
  "aurora",
];

export const THEMES: Record<ThemeName, ThemeDefinition> = {
  midnight: {
    label: "Midnight",
    swatch: "bg-gradient-to-tr from-cyan-500 to-teal-400",
    vars: {
      "--bg-app-from": "#020617",
      "--bg-app-via": "#0f172a",
      "--bg-app-to": "#020617",
      "--bg-solid": "#020617",
      "--bg-header": "rgba(2,6,23,0.45)",
      "--bg-sidebar": "rgba(2,6,23,0.92)",
      "--bg-panel": "rgba(2,6,23,0.65)",
      "--bg-input": "rgba(15,23,42,0.75)",
      "--bg-card": "rgba(15,23,42,0.6)",
      "--bg-card-hover": "rgba(30,41,59,0.75)",
      "--bg-active": "rgba(30,41,59,0.85)",
      "--bg-bubble-user": "#1e293b",
      "--bubble-user-text": "#f1f5f9",
      "--bg-bubble-assistant": "rgba(15,23,42,0.6)",
      "--border": "rgba(255,255,255,0.06)",
      "--border-strong": "rgba(255,255,255,0.12)",
      "--text-primary": "#f1f5f9",
      "--text-secondary": "#cbd5e1",
      "--text-muted": "#64748b",
      "--accent-from": "#06b6d4",
      "--accent-to": "#2dd4bf",
      "--accent-solid": "#22d3ee",
      "--accent-text": "#020617",
      "--ring": "rgba(6,182,212,0.25)",
      "--danger": "#fb7185",
      "--danger-bg": "rgba(244,63,94,0.12)",
    },
  },
  snow: {
    label: "Snow",
    swatch: "bg-gradient-to-tr from-slate-200 to-white border border-slate-300",
    vars: {
      "--bg-app-from": "#ffffff",
      "--bg-app-via": "#f8fafc",
      "--bg-app-to": "#ffffff",
      "--bg-solid": "#ffffff",
      "--bg-header": "rgba(255,255,255,0.75)",
      "--bg-sidebar": "rgba(248,250,252,0.92)",
      "--bg-panel": "rgba(255,255,255,0.8)",
      "--bg-input": "rgba(255,255,255,0.95)",
      "--bg-card": "rgba(255,255,255,0.8)",
      "--bg-card-hover": "rgba(241,245,249,1)",
      "--bg-active": "rgba(226,232,240,0.9)",
      "--bg-bubble-user": "#0f172a",
      "--bubble-user-text": "#f8fafc",
      "--bg-bubble-assistant": "rgba(255,255,255,0.95)",
      "--border": "rgba(15,23,42,0.08)",
      "--border-strong": "rgba(15,23,42,0.16)",
      "--text-primary": "#0f172a",
      "--text-secondary": "#334155",
      "--text-muted": "#94a3b8",
      "--accent-from": "#0ea5e9",
      "--accent-to": "#6366f1",
      "--accent-solid": "#4f46e5",
      "--accent-text": "#ffffff",
      "--ring": "rgba(79,70,229,0.18)",
      "--danger": "#e11d48",
      "--danger-bg": "rgba(225,29,72,0.08)",
    },
  },
  crimson: {
    label: "Crimson",
    swatch: "bg-gradient-to-tr from-rose-600 to-orange-400",
    vars: {
      "--bg-app-from": "#1a0508",
      "--bg-app-via": "#2a0a10",
      "--bg-app-to": "#1a0508",
      "--bg-solid": "#1a0508",
      "--bg-header": "rgba(26,5,8,0.5)",
      "--bg-sidebar": "rgba(20,4,7,0.92)",
      "--bg-panel": "rgba(26,5,8,0.7)",
      "--bg-input": "rgba(46,10,16,0.8)",
      "--bg-card": "rgba(46,10,16,0.6)",
      "--bg-card-hover": "rgba(69,15,23,0.8)",
      "--bg-active": "rgba(80,17,26,0.9)",
      "--bg-bubble-user": "#3f0d14",
      "--bubble-user-text": "#fce7e9",
      "--bg-bubble-assistant": "rgba(46,10,16,0.65)",
      "--border": "rgba(255,255,255,0.06)",
      "--border-strong": "rgba(255,120,110,0.18)",
      "--text-primary": "#fdf2f2",
      "--text-secondary": "#f0c9cd",
      "--text-muted": "#a3676e",
      "--accent-from": "#e11d48",
      "--accent-to": "#f97316",
      "--accent-solid": "#f43f5e",
      "--accent-text": "#1a0508",
      "--ring": "rgba(244,63,94,0.25)",
      "--danger": "#fb7185",
      "--danger-bg": "rgba(244,63,94,0.15)",
    },
  },
  sky: {
    label: "Sky",
    swatch: "bg-gradient-to-tr from-sky-400 to-blue-300",
    vars: {
      "--bg-app-from": "#eef7ff",
      "--bg-app-via": "#e0f2fe",
      "--bg-app-to": "#eef7ff",
      "--bg-solid": "#eef7ff",
      "--bg-header": "rgba(255,255,255,0.7)",
      "--bg-sidebar": "rgba(224,242,254,0.85)",
      "--bg-panel": "rgba(255,255,255,0.75)",
      "--bg-input": "rgba(255,255,255,0.92)",
      "--bg-card": "rgba(255,255,255,0.75)",
      "--bg-card-hover": "rgba(224,242,254,0.9)",
      "--bg-active": "rgba(186,230,253,0.9)",
      "--bg-bubble-user": "#0369a1",
      "--bubble-user-text": "#f0f9ff",
      "--bg-bubble-assistant": "rgba(255,255,255,0.92)",
      "--border": "rgba(3,105,161,0.1)",
      "--border-strong": "rgba(3,105,161,0.2)",
      "--text-primary": "#0c4a6e",
      "--text-secondary": "#0369a1",
      "--text-muted": "#7dabc4",
      "--accent-from": "#0ea5e9",
      "--accent-to": "#38bdf8",
      "--accent-solid": "#0284c7",
      "--accent-text": "#ffffff",
      "--ring": "rgba(2,132,199,0.18)",
      "--danger": "#dc2626",
      "--danger-bg": "rgba(220,38,38,0.08)",
    },
  },
  blossom: {
    label: "Blossom",
    swatch: "bg-gradient-to-tr from-pink-400 to-fuchsia-300",
    vars: {
      "--bg-app-from": "#fff5fa",
      "--bg-app-via": "#fce7f3",
      "--bg-app-to": "#fff5fa",
      "--bg-solid": "#fff5fa",
      "--bg-header": "rgba(255,255,255,0.72)",
      "--bg-sidebar": "rgba(252,231,243,0.85)",
      "--bg-panel": "rgba(255,255,255,0.78)",
      "--bg-input": "rgba(255,255,255,0.92)",
      "--bg-card": "rgba(255,255,255,0.78)",
      "--bg-card-hover": "rgba(252,231,243,0.9)",
      "--bg-active": "rgba(251,207,232,0.9)",
      "--bg-bubble-user": "#9d174d",
      "--bubble-user-text": "#fdf2f8",
      "--bg-bubble-assistant": "rgba(255,255,255,0.92)",
      "--border": "rgba(157,23,77,0.1)",
      "--border-strong": "rgba(157,23,77,0.2)",
      "--text-primary": "#831843",
      "--text-secondary": "#9d174d",
      "--text-muted": "#c589a7",
      "--accent-from": "#ec4899",
      "--accent-to": "#f472b6",
      "--accent-solid": "#db2777",
      "--accent-text": "#ffffff",
      "--ring": "rgba(219,39,119,0.18)",
      "--danger": "#dc2626",
      "--danger-bg": "rgba(220,38,38,0.08)",
    },
  },
  aurora: {
    label: "Aurora",
    swatch: "bg-gradient-to-tr from-violet-500 to-indigo-400",
    vars: {
      "--bg-app-from": "#0b0a1a",
      "--bg-app-via": "#140f2b",
      "--bg-app-to": "#0b0a1a",
      "--bg-solid": "#0b0a1a",
      "--bg-header": "rgba(11,10,26,0.5)",
      "--bg-sidebar": "rgba(10,9,24,0.92)",
      "--bg-panel": "rgba(11,10,26,0.7)",
      "--bg-input": "rgba(24,20,49,0.8)",
      "--bg-card": "rgba(24,20,49,0.6)",
      "--bg-card-hover": "rgba(36,29,74,0.8)",
      "--bg-active": "rgba(45,36,92,0.9)",
      "--bg-bubble-user": "#2b2160",
      "--bubble-user-text": "#ede9fe",
      "--bg-bubble-assistant": "rgba(24,20,49,0.65)",
      "--border": "rgba(255,255,255,0.06)",
      "--border-strong": "rgba(167,139,250,0.2)",
      "--text-primary": "#f1eefc",
      "--text-secondary": "#cbc2f0",
      "--text-muted": "#7c72a8",
      "--accent-from": "#8b5cf6",
      "--accent-to": "#6366f1",
      "--accent-solid": "#a78bfa",
      "--accent-text": "#0b0a1a",
      "--ring": "rgba(139,92,246,0.25)",
      "--danger": "#fb7185",
      "--danger-bg": "rgba(244,63,94,0.14)",
    },
  },
};

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "chatbot-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("midnight");

  // Load persisted theme on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeName | null;
      if (stored && THEMES[stored]) {
        setThemeState(stored);
      }
    } catch {
      // ignore (e.g. privacy mode)
    }
  }, []);

  // Apply CSS variables to the document root whenever the theme changes
  useEffect(() => {
    const vars = THEMES[theme].vars;
    const root = document.documentElement;

    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    root.dataset.theme = theme;

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const setTheme = (next: ThemeName) => setThemeState(next);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}