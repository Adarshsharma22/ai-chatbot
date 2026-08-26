import type { Chat } from "@/types/chat";

const STORAGE_KEY = "ai-chatbot-chats";

export function getChats(): Chat[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedChats = localStorage.getItem(STORAGE_KEY);

    if (!storedChats) {
      return [];
    }

    return JSON.parse(storedChats);
  } catch {
    return [];
  }
}

export function saveChats(chats: Chat[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(chats)
  );
}

export function deleteChat(chatId: string) {
  const chats = getChats();

  const updatedChats = chats.filter(
    (chat) => chat.id !== chatId
  );

  saveChats(updatedChats);
}

export function clearChats() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
}