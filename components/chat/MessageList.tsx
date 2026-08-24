import EmptyChat from "@/components/chat/EmptyChat";

export default function MessageList() {
  return (
    <div className="flex-1 overflow-y-auto">
      <EmptyChat />
    </div>
  );
}