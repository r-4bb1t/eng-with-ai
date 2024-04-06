import { ConceptType } from "../types/concept";

export default function Header({ concept }: { concept: ConceptType }) {
  return (
    <div className="fixed inset-x-0 top-0 z-10 flex h-36 w-full flex-col items-center justify-center bg-base-200 px-8 text-center md:h-24">
      <h1 className="text-xl font-bold md:text-2xl">{concept.topic}</h1>
      <h2 className="font-medium md:text-lg">{concept.description}</h2>
    </div>
  );
}
