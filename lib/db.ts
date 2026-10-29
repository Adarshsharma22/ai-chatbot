import clientPromise from "@/lib/mongodb";

export async function getDatabase() {
  const client = await clientPromise;

  return client.db("ai-chatbot");
}

export async function getChatsCollection() {
  const db = await getDatabase();

  return db.collection("chats");
}