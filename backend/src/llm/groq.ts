import OpenAI from "openai";
import { z } from "zod";
import { config } from "../config.js";

let client: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!client) {
    client = new OpenAI({
      apiKey: config.groqAPIKey(),
      baseURL: "https://api.groq.com/openai/v1",
    });
  }

  return client;
}

export async function complete<T extends z.ZodTypeAny>(
  system: string,
  user: string,
  schema: T,
): Promise<z.infer<T>> {
  const shape = JSON.stringify(z.toJSONSchema(schema));

  const response = await getOpenAIClient().chat.completions.create({
    model: config.model,
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          `${system}\n\nReply with one JSON object matching this JSON Schema. ` +
          `Do not add markdown fences or any text around it:\n${shape}`,
      },
      { role: "user", content: user },
    ],
  });

  const text = response.choices[0]?.message?.content;
  if(!text){
    throw new Error("The model returned an empty response.");
  }

  return schema.parse(JSON.parse(text));
}
