export const PROMPT = `Whenever I speak in English,
your task is to identify and correct any grammatical errors in my sentences,
enabling me to improve my English proficiency.
If my sentences are grammatically correct, continue the conversation seamlessly.
This approach will help me practice and refine my English communication skills effectively.`;

export const CONCEPT_PROMPT = (concept: {
  topic: string;
  description: string;
}) => `The topic of today's conversation is ${concept.topic}.
${concept.description}
`;
