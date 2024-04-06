import Main from "./main";

import Header from "./components/header";
import { getRandomConcept } from "./constants/concepts";

const getConcept = () => getRandomConcept();

export default function Home() {
  const concept = getConcept();

  return (
    <main className="flex h-[100dvh] w-full max-w-3xl flex-col items-center pt-32">
      <Header concept={concept} />
      <Main concept={concept} />
    </main>
  );
}
