import { CONCEPT_PROMPT, PROMPT } from "@/app/constants/prompt";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const POST = async (req: Request) => {
  const { text, history, concept } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      ...history,
      {
        role: "user",
        content: text,
      },
      {
        role: "assistant",
        content: PROMPT,
      },
      {
        role: "assistant",
        content: CONCEPT_PROMPT(concept),
      },
    ],
  });

  console.log(response.choices[0].message.content);

  const data = JSON.parse(response.choices[0].message.content || "");

  return Response.json(data);
};
