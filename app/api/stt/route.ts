import { STT_PROMPT } from "@/app/constants/prompt";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const speech = formData.get("speech") as File;
  const topic = formData.get("concept") as string;

  const transcription = await openai.audio.transcriptions.create({
    file: speech,
    model: "whisper-1",
    response_format: "text",
    prompt: STT_PROMPT(topic),
  });

  return Response.json({ text: transcription });
};
