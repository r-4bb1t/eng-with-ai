import Main from "./main";
import Header from "./components/header";
import { getRandomConcept } from "./constants/concepts";

export default function Home() {
  const getConcept = () => getRandomConcept();
  const concept = getConcept();

  return (
    <main className="flex h-[100dvh] w-full max-w-3xl flex-col items-center pt-36 md:pt-24">
      <Header concept={concept} />
      <Main concept={concept} />
    </main>
  );
}
