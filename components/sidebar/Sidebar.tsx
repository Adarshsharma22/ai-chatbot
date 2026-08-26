"use client";

import {
  MessageSquare,
  Plus,
  Trash2,
} from "lucide-react";

import type { Chat } from "@/types/chat";

type SidebarProps = {
  chats: Chat[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
};

export default function Sidebar({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
}: SidebarProps) {
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
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                  activeChatId === chat.id
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-900 hover:text-white"
                }`}
              >
                <MessageSquare
                  size={16}
                  className="shrink-0"
                />

                <span className="truncate">
                  {chat.title}
                </span>
              </button>
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