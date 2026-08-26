export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
};