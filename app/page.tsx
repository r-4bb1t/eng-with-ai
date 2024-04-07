import Main from "./main";
import Header from "./components/header";
import { ConceptType } from "./types/concept";

const getConcept = async () => {
  try {
    const res = await fetch(process.env.APP_URL + "/api/concepts", {
      cache: "no-cache",
      next: {
        revalidate: 1,
      },
    });
    const { concept }: { concept: ConceptType } = await res.json();
    return concept;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default async function Home() {
  const concept = await getConcept();

  return (
    <main className="flex h-[100dvh] w-full max-w-3xl flex-col items-center pt-36 md:pt-24">
      {concept ? (
        <>
          <Header concept={concept} />
          <Main concept={concept} />
        </>
      ) : (
        <div>Something Went Wrong...</div>
      )}
    </main>
  );
}
