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
import type { Chat } from "@/types/chat";

type SidebarProps = {
  chats: Chat[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onRenameChat: (chatId: string,title: string) => void;
};

export default function Sidebar({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onRenameChat,
}: SidebarProps) {

  const [editingChatId, setEditingChatId] =
    useState<string | null>(null);

  const [editingTitle, setEditingTitle] =
    useState("");
  return (
    <aside className="hidden w-64 flex-col border-r border-gray-800 bg-gray-950 md:flex">
      {/* New Chat */}
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="flex w-full items-center gap-3 rounded-lg border border-gray-700 px-4 py-3 text-sm transition hover:bg-gray-900"
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-3">
        <p className="mb-3 px-2 text-xs font-medium uppercase text-gray-500">
          Recent Chats
        </p>

        {chats.length === 0 ? (
          <div className="px-2 text-sm text-gray-500">
            No chats yet
          </div>
        ) : (
          <div className="space-y-1">
            {chats.map((chat) => (
            <div
                key={chat.id}
                className={`group flex items-center rounded-lg transition ${
                activeChatId === chat.id
                    ? "bg-gray-800"
                    : "hover:bg-gray-900"
                }`}
            >
                {editingChatId === chat.id ? (
                <div className="flex min-w-0 flex-1 items-center gap-1 px-2 py-1">
                    <input
                    value={editingTitle}
                    onChange={(event) =>
                        setEditingTitle(event.target.value)
                    }
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                        onRenameChat(chat.id, editingTitle);
                        setEditingChatId(null);
                        }

                        if (event.key === "Escape") {
                        setEditingChatId(null);
                        }
                    }}
                    autoFocus
                    className="min-w-0 flex-1 rounded bg-gray-700 px-2 py-1 text-sm text-white outline-none"
                    />

                    <button
                    onClick={() => {
                        onRenameChat(chat.id, editingTitle);
                        setEditingChatId(null);
                    }}
                    className="p-1 text-gray-400 hover:text-white"
                    aria-label="Save rename"
                    >
                    <Check size={14} />
                    </button>

                    <button
                    onClick={() => setEditingChatId(null)}
                    className="p-1 text-gray-400 hover:text-white"
                    aria-label="Cancel rename"
                    >
                    <X size={14} />
                    </button>
                </div>
                ) : (
                <>
                    <button
                    onClick={() => onSelectChat(chat.id)}
                    className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2 text-left text-sm"
                    >
                    <MessageSquare
                        size={16}
                        className="shrink-0 text-gray-500"
                    />

                    <span className="truncate">
                        {chat.title}
                    </span>
                    </button>

                    <button
                    onClick={() => {
                        setEditingChatId(chat.id);
                        setEditingTitle(chat.title);
                    }}
                    className="hidden p-1 text-gray-500 hover:text-white group-hover:block"
                    aria-label="Rename chat"
                    >
                    <Edit3 size={14} />
                    </button>

                    <button
                    onClick={() => onDeleteChat(chat.id)}
                    className="mr-2 hidden p-1 text-gray-500 hover:text-red-400 group-hover:block"
                    aria-label="Delete chat"
                    >
                    <Trash2 size={14} />
                    </button>
                </>
                )}
            </div>
            ))}
          </div>
        )}
      </div>

      {/* Clear All */}
      <div className="border-t border-gray-800 p-4">
        <button
          onClick={() => {
            localStorage.removeItem(
              "ai-chatbot-chats"
            );

            window.location.reload();
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 transition hover:bg-gray-900 hover:text-white"
        >
          <Trash2 size={17} />
          Clear All Chats
        </button>
      </div>
    </aside>
  );
}