export const PROMPT = `Whenever I speak in English,
your task is to identify and correct any grammatical errors in my sentences,
enabling me to improve my English proficiency.
If my sentences are grammatically correct, continue the conversation seamlessly.
This approach will help me practice and refine my English communication skills effectively.
Please give the difficult English words with the meaning in Korean.

RESPONSE FORMAT MUST BE IN JSON FORMAT
Example:
{
  "response": "Your response here",
  "grammar": "If my grammar is wrong, identify and correct any grammatical errors in my sentences!",
  "words: [
    {
        "word": "word",
        "meaning": "simple meaning in Korean"
    }
  ]
}
`;

export const CONCEPT_PROMPT = (concept: {
  topic: string;
  description: string;
}) => `The topic of today's conversation is ${concept.topic}.
${concept.description}
`;

export const STT_PROMPT = (
  topic: string,
) => `Don't filter out interjections such as 'uh', 'um', 'hmm', and similar sounds.
Transcribe user speech accurately, including moments when the user corrects themselves, hesitates, or uses filler words.
This design should ensure that all aspects of spoken dialogue, including revisions and thinking pauses, are captured without filtering.
Don't correct the user's speech.
User is Korean and user's speech is in English. The topic is about ${topic}`;
