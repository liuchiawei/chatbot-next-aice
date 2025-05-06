import { tool, experimental_generateImage as generateImage } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import sharp from "sharp";

export const generateImageTool = tool({
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
});
