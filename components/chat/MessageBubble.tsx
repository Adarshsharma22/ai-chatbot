"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, Check, Copy, User } from "lucide-react";

import type { Message } from "@/types/chat";

type MessageBubbleProps = {
  message: Message;
};

export default function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`mb-5 flex gap-2.5 sm:mb-6 sm:gap-3.5 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[var(--accent-from)] to-[var(--accent-to)] text-[var(--accent-text)] shadow-md sm:h-9 sm:w-9">
          <Bot size={16} strokeWidth={2.5} className="sm:hidden" />
          <Bot size={18} strokeWidth={2.5} className="hidden sm:block" />
        </div>
      )}

      <div className="max-w-[86%] sm:max-w-[82%]">
        <div
          className={`rounded-2xl px-3.5 py-3 text-sm shadow-sm sm:px-4 sm:py-3.5 ${
            isUser
              ? "rounded-tr-md border border-[var(--border-strong)]"
              : "rounded-tl-md border border-[var(--border)] backdrop-blur-md"
          }`}
          style={
            isUser
              ? {
                  backgroundColor: "var(--bg-bubble-user)",
                  color: "var(--bubble-user-text)",
                }
              : {
                  backgroundColor: "var(--bg-bubble-assistant)",
                  color: "var(--text-secondary)",
                }
          }
        >
          {isUser ? (
            <div className="whitespace-pre-wrap break-words leading-relaxed">
              {message.content}
            </div>
          ) : (
            <div
              className="max-w-none break-words text-sm leading-7
              [&_h1]:mb-3 [&_h1]:mt-5 [&_h1]:text-xl [&_h1]:font-semibold [&_h1]:text-[var(--text-primary)]
              [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-[var(--text-primary)]
              [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[var(--text-primary)]
              [&_p]:my-2.5 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1
              [&_strong]:font-semibold [&_strong]:text-[var(--accent-solid)]
              [&_code]:rounded-md [&_code]:bg-[var(--bg-active)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_code]:text-[var(--accent-solid)]
              [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-[var(--border-strong)] [&_pre]:bg-[var(--bg-solid)] [&_pre]:p-3 sm:[&_pre]:p-4
              [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-[var(--text-secondary)]
              [&_a]:text-[var(--accent-solid)] [&_a]:underline
              [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--accent-solid)] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[var(--text-muted)]
              [&_hr]:my-5 [&_hr]:border-[var(--border-strong)]"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {!isUser && message.content && (
          <button
            onClick={handleCopy}
            className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--accent-solid)] sm:mt-2"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-400" />
                <span className="font-medium text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>

      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text-secondary)] sm:h-9 sm:w-9">
          <User size={16} className="sm:hidden" />
          <User size={18} className="hidden sm:block" />
        </div>
      )}
    </motion.div>
  );
}