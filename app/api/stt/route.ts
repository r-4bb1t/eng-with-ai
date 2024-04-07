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
    prompt: `Don't filter out interjections such as 'uh', 'um', 'hmm', and similar sounds.
    Transcribe user speech accurately, including moments when the user corrects themselves, hesitates, or uses filler words.
    This design should ensure that all aspects of spoken dialogue, including revisions and thinking pauses, are captured without filtering.
    User is Korean and user's speech is in English. The topic is about ${topic}`,
  });

  return Response.json({ text: transcription });
};
