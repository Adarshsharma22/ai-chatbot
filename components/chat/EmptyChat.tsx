import { Bot } from "lucide-react";

export default function EmptyChat() {
  return (
    <div className="flex h-full items-center justify-center px-6">
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-black">
          <Bot size={32} />
        </div>

        <h2 className="text-2xl font-semibold">
          How can I help you?
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Ask me anything to get started.
        </p>
      </div>
    </div>
  );
}