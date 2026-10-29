import { getChatsCollection } from "@/lib/db";
import { getOrCreateUserId } from "@/lib/session";

export async function GET() {
  try {
    // Get the unique anonymous user ID for this browser/device
    const userId = await getOrCreateUserId();

    const chats = await getChatsCollection();

    // Only return this user's chats
    const results = await chats
      .find({ userId })
      .sort({ updatedAt: -1 })
      .toArray();

    return Response.json(results);
  } catch (error) {
    console.error("Failed to fetch chats:", error);

    return Response.json(
      {
        error: "Failed to fetch chats",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Get the unique user ID for this browser/device
    const userId = await getOrCreateUserId();

    const body = await request.json();

    const { title = "New Chat" } = body;

    // Store the userId with the chat
    const chat = {
      userId,
      title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const chats = await getChatsCollection();

    const result = await chats.insertOne(chat);

    return Response.json(
      {
        id: result.insertedId,
        ...chat,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Failed to create chat:", error);

    return Response.json(
      {
        error: "Failed to create chat",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE() {
  try {
    // Get the current user's ID
    const userId = await getOrCreateUserId();

    const chats = await getChatsCollection();

    // Delete ONLY this user's chats
    await chats.deleteMany({ userId });

    return Response.json({
      message: "All chats deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete all chats:", error);

    return Response.json(
      {
        error: "Failed to delete all chats",
      },
      {
        status: 500,
      }
    );
  }
}