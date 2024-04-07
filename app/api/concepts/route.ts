import { getRandomConcept } from "@/app/constants/concepts";

export const GET = async (_: Request) => {
  return Response.json({ concept: getRandomConcept() });
};
