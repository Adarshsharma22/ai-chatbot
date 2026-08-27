import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(request: Request) {
  try {

    const body = await request.json();

    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        {
          error: "Messages are required",
        },
        {
          status: 400,
        }
      );
    }

    const result = await generateText({
      model: google("gemini-3.6-flash"),
      messages,
    });

    return Response.json({
      message: result.text,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return Response.json(
      {
        error: "Failed to generate AI response",
      },
      {
        status: 500,
      }
    );
  }
}
