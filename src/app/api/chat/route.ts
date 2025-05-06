import { openai } from "@ai-sdk/openai";
import {
  streamText,
  tool,
  experimental_generateImage as generateImage,
} from "ai";
import { z } from "zod";
import { generateImageTool } from "@/lib/tools/generateImage";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, data } = await req.json();

  const result = streamText({
    model: openai.responses("gpt-4o"),
    messages,
    system:
      "You are a professional writer. " +
      "You write simple, clear, and concise Japanese content.",
    tools: {
      web_search_preview: openai.tools.webSearchPreview(),
      generateImageTool: generateImageTool,
    },
    maxSteps: 10,
  });

  return result.toDataStreamResponse();
}
