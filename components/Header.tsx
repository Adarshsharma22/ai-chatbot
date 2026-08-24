import { Bot } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 items-center border-b border-gray-800 px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black">
          <Bot size={20} />
        </div>

        <div>
          <h1 className="font-semibold">AI Chatbot</h1>
          <p className="text-xs text-gray-400">AI Assistant</p>
        </div>
      </div>
    </header>
  );
}