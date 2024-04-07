import { getRandomConcept } from "@/app/constants/concepts";

export const GET = async (_: Request) => {
  const concept = getRandomConcept();
  console.log(concept);
  return Response.json({ concept });
};

export const dynamic = "force-dynamic";
