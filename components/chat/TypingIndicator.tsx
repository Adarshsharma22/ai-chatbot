import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="mb-6 flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-black">
        <Bot size={17} />
      </div>

      <div className="flex items-center gap-1 rounded-2xl bg-gray-900 px-4 py-3">
        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
      </div>
    </div>
  );
}