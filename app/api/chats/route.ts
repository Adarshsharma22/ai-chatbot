import { getChatsCollection } from "@/lib/db";

export async function GET() {
  try {
    const chats = await getChatsCollection();

    const results = await chats
      .find({})
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
    const body = await request.json();

    const { title = "New Chat" } = body;

    const chat = {
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
    const chats = await getChatsCollection();

    await chats.deleteMany({});

    return Response.json({
      message: "All chats deleted successfully",
    });
  } catch (error) {
    console.error(
      "Failed to delete all chats:",
      error
    );

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