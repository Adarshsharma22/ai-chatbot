import { MessageSquare, Plus } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-gray-800 bg-gray-950 md:flex">
      <div className="p-4">
        <button className="flex w-full items-center gap-3 rounded-lg border border-gray-700 px-4 py-3 text-sm transition hover:bg-gray-900">
          <Plus size={18} />
          New Chat
        </button>
      </div>

      <div className="px-4">
        <p className="mb-3 text-xs font-medium uppercase text-gray-500">
          Recent Chats
        </p>

        <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-400">
          <MessageSquare size={17} />
          No chats yet
        </div>
      </div>
    </aside>
  );
}
