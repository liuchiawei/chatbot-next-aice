import { openai } from "@ai-sdk/openai";
import {
  streamText,
  tool,
  experimental_generateImage as generateImage,
} from "ai";
import { z } from "zod";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai.responses("gpt-4o"),
    messages,
    system:
      "You are a professional writer. " +
      "You write simple, clear, and concise Japanese content.",
    tools: {
      web_search_preview: openai.tools.webSearchPreview(),
      // TODO: upload image to Cloud
      generateImageTool: tool({
        description: "Generate an image based on a prompt",
        parameters: z.object({
          prompt: z.string().describe("The prompt to generate an image for"),
        }),
        execute: async ({ prompt }) => {
          const image = await generateImage({
            model: openai.image("dall-e-3"),
            prompt,
            // n: 1,
            size: "1024x1024",
            providerOptions: {
              openai: {
                style: "vivid",
                quality: "standard",
              },
            },
          });
          const base64 = image.images[0].base64;
          return { image: base64 };
        },
      }),
    },
    maxSteps: 10,
  });

  return result.toDataStreamResponse();
}
