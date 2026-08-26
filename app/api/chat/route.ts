import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(request: Request) {
  try {
    console.log(
      "GOOGLE_GENERATIVE_AI_API_KEY exists:",
      !!process.env.GOOGLE_GENERATIVE_AI_API_KEY
    );

    const body = await request.json();

    const messages = body.messages;

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        {
          error: "Invalid messages",
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
        error: "Something went wrong while generating the response.",
      },
      {
        status: 500,
      }
    );
  }
}