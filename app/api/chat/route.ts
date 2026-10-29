import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate messages
    if (!body.messages || !Array.isArray(body.messages)) {
      return Response.json(
        {
          error: "Invalid messages",
        },
        {
          status: 400,
        }
      );
    }

    // Generate AI response using Gemini
    const result = await generateText({
      model: google("gemini-3.6-flash"),
      messages: body.messages,
    });

    return Response.json(
      {
        message: result.text,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("AI generation error:", error);

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