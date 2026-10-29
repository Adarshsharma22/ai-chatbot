"use client";

import {
  Check,
  Edit3,
  MessageSquare,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Chat } from "@/types/chat";

type SidebarProps = {
  chats: Chat[];
  activeChatId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onRenameChat: (chatId: string, title: string) => void;
  onClearChats: () => void;
};

export default function Sidebar({
  chats,
  activeChatId,
  isOpen,
  onClose,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onRenameChat,
  onClearChats,
}: SidebarProps) {
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const sidebarContent = (
    <>
      {/* New Chat Button */}
      <div className="p-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition duration-200 hover:border-[var(--accent-solid)]/40 hover:bg-[var(--bg-card-hover)]"
        >
          <Plus size={16} className="text-[var(--accent-solid)]" />
          New Chat
        </motion.button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-3">
        <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Recent Chats
        </p>

        {chats.length === 0 ? (
          <div className="px-2 py-4 text-center text-xs text-[var(--text-muted)]">
            No active conversations
          </div>
        ) : (
          <div className="space-y-1">
            <AnimatePresence initial={false}>
              {chats.map((chat) => (
                <motion.div
                  key={chat._id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`group flex items-center rounded-xl transition-colors duration-150 ${
                    activeChatId === chat._id
                      ? "border border-[var(--accent-solid)]/25 bg-[var(--bg-active)] text-[var(--accent-solid)] shadow-sm"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {editingChatId === chat._id ? (
                    <div className="flex min-w-0 flex-1 items-center gap-1.5 px-2 py-1.5">
                      <input
                        value={editingTitle}
                        onChange={(event) =>
                          setEditingTitle(event.target.value)
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            onRenameChat(chat._id, editingTitle);
                            setEditingChatId(null);
                          }
                          if (event.key === "Escape") {
                            setEditingChatId(null);
                          }
                        }}
                        autoFocus
                        className="min-w-0 flex-1 rounded-md bg-[var(--bg-input)] px-2.5 py-1 text-xs text-[var(--text-primary)] outline-none ring-1 ring-[var(--accent-solid)]/50"
                      />

                      <button
                        onClick={() => {
                          onRenameChat(chat._id, editingTitle);
                          setEditingChatId(null);
                        }}
                        className="p-1 text-[var(--text-muted)] hover:text-[var(--accent-solid)]"
                        aria-label="Save rename"
                      >
                        <Check size={14} />
                      </button>

                      <button
                        onClick={() => setEditingChatId(null)}
                        className="p-1 text-[var(--text-muted)] hover:text-[var(--danger)]"
                        aria-label="Cancel rename"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => onSelectChat(chat._id)}
                        className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2.5 text-left text-xs font-medium"
                      >
                        <MessageSquare
                          size={15}
                          className={`shrink-0 ${
                            activeChatId === chat._id
                              ? "text-[var(--accent-solid)]"
                              : "text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]"
                          }`}
                        />
                        <span className="truncate">{chat.title}</span>
                      </button>

                      <button
                        onClick={() => {
                          setEditingChatId(chat._id);
                          setEditingTitle(chat.title);
                        }}
                        className="p-1.5 text-[var(--text-muted)] opacity-0 transition hover:text-[var(--text-primary)] group-hover:opacity-100 focus-visible:opacity-100"
                        aria-label="Rename chat"
                      >
                        <Edit3 size={13} />
                      </button>

                      <button
                        onClick={() => onDeleteChat(chat._id)}
                        className="mr-1.5 p-1.5 text-[var(--text-muted)] opacity-0 transition hover:text-[var(--danger)] group-hover:opacity-100 focus-visible:opacity-100"
                        aria-label="Delete chat"
                      >
                        <Trash2 size={13} />
                      </button>
                    </>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Clear All Button */}
      <div className="border-t border-[var(--border)] p-4">
        <button
          onClick={onClearChats}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-[var(--text-muted)] transition hover:bg-[var(--danger-bg)] hover:text-[var(--danger)] active:scale-95"
        >
          <Trash2 size={15} />
          Clear All Chats
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--bg-sidebar)] text-[var(--text-secondary)] md:flex lg:w-72">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[80vw] flex-col border-r border-[var(--border)] bg-[var(--bg-sidebar)] text-[var(--text-secondary)] shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between px-4 pt-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Menu
                </span>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]"
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
              </div>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}