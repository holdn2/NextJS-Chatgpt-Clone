import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    data: { model },
  } = await req.json();

  const result = streamText({
    model: openai(model || "gpt-3.5-turbo-instruct"),
    messages,
  });

  return result.toDataStreamResponse();
}
