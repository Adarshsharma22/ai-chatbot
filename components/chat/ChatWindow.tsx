import Header from "@/components/Header";
import MessageList from "@/components/chat/MessageList";
import ChatInput from "@/components/chat/ChatInput";
import Sidebar from "@/components/sidebar/Sidebar";

export default function ChatWindow() {
  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">
        <Header />

        <MessageList />

        <ChatInput />
      </main>
    </div>
  );
}