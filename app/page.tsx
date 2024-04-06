import Header from "./components/header";
import { getRandomConcept } from "./constants/concepts";
import Main from "./main";

const concept = getRandomConcept();

export default function Home() {
  return (
    <main className="flex h-[100dvh] w-full max-w-4xl flex-col items-center pt-32">
      <Header concept={concept} />
      <Main concept={concept} />
    </main>
  );
}
