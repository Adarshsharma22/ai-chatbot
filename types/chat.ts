export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type Chat = {
  _id: string;
  title: string;
  messages: Message[];
  createdAt: string | Date;
  updatedAt: string | Date;
};