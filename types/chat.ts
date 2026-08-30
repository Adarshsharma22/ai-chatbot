export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type Chat = {
  _id: string;
  userId?: string;
  title: string;
  messages: Message[];
  createdAt: string | Date;
  updatedAt: string | Date;
};