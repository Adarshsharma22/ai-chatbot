import { ObjectId } from "mongodb";
import { getChatsCollection } from "@/lib/db";
import { getOrCreateUserId } from "@/lib/session";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { error: "Invalid chat ID" },
        { status: 400 }
      );
    }

    const userId = await getOrCreateUserId();
    const chats = await getChatsCollection();

    // Matching on userId too means even a guessed/shared chat ID
    // won't open someone else's conversation
    const chat = await chats.findOne({
      _id: new ObjectId(id),
      userId,
    });

    if (!chat) {
      return Response.json(
        { error: "Chat not found" },
        { status: 404 }
      );
    }

    return Response.json(chat);
  } catch (error) {
    console.error("Failed to fetch chat:", error);

    return Response.json(
      { error: "Failed to fetch chat" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { error: "Invalid chat ID" },
        { status: 400 }
      );
    }

    const userId = await getOrCreateUserId();
    const body = await request.json();

    const chats = await getChatsCollection();

    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (typeof body.title === "string") {
      updateData.title = body.title;
    }

    if (Array.isArray(body.messages)) {
      updateData.messages = body.messages;
    }

    const result = await chats.findOneAndUpdate(
      {
        _id: new ObjectId(id),
        userId,
      },
      {
        $set: updateData,
      },
      {
        returnDocument: "after",
      }
    );

    if (!result) {
      return Response.json(
        { error: "Chat not found" },
        { status: 404 }
      );
    }

    return Response.json(result);
  } catch (error) {
    console.error("Failed to update chat:", error);

    return Response.json(
      { error: "Failed to update chat" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { error: "Invalid chat ID" },
        { status: 400 }
      );
    }

    const userId = await getOrCreateUserId();
    const chats = await getChatsCollection();

    const result = await chats.deleteOne({
      _id: new ObjectId(id),
      userId,
    });

    if (result.deletedCount === 0) {
      return Response.json(
        { error: "Chat not found" },
        { status: 404 }
      );
    }

    return Response.json({
      message: "Chat deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete chat:", error);

    return Response.json(
      { error: "Failed to delete chat" },
      { status: 500 }
    );
  }
}