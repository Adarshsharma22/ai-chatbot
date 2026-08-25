"use client";

import { MessageSquare, Plus, Trash2 } from "lucide-react";

type SidebarProps = {
  onNewChat: () => void;
};

export default function Sidebar({
  onNewChat,
}: SidebarProps) {
  return (
    <aside className="hidden w-64 flex-col border-r border-gray-800 bg-gray-950 md:flex">
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="flex w-full items-center gap-3 rounded-lg border border-gray-700 px-4 py-3 text-sm transition hover:bg-gray-900"
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      <div className="flex-1 px-4">
        <p className="mb-3 text-xs font-medium uppercase text-gray-500">
          Recent Chats
        </p>

        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400">
          <MessageSquare size={17} />
          No chats yet
        </div>
      </div>

      <div className="border-t border-gray-800 p-4">
        <button
          onClick={onNewChat}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400 transition hover:bg-gray-900 hover:text-white"
        >
          <Trash2 size={17} />
          Clear Chat
        </button>
      </div>
    </aside>
  );
}