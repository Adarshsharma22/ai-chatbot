import { ArrowUp } from "lucide-react";

export default function ChatInput() {
  return (
    <div className="border-t border-gray-800 p-4">
      <div className="mx-auto flex max-w-3xl items-end gap-3 rounded-2xl border border-gray-700 bg-gray-900 p-2">
        <textarea
          placeholder="Ask anything..."
          rows={1}
          className="min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500"
        />

        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black transition hover:bg-gray-200"
          aria-label="Send message"
        >
          <ArrowUp size={18} />
        </button>
      </div>

      <p className="mt-2 text-center text-xs text-gray-500">
        AI can make mistakes. Check important information.
      </p>
    </div>
  );
}