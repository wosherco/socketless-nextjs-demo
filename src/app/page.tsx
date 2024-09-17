import { socketless } from "@/server/socketless";
import Link from "next/link";
import { generate } from "random-words";
import ChatWithProvider from "@/components/ChatWithProvider";

export const runtime = "edge";

export default async function Home() {
  const name = generate({
    exactly: 4, join: "", formatter: (word, index) => {
      return index === 0
        ? word.slice(0, 1).toUpperCase().concat(word.slice(1))
        : word;
    },
  })
  const { url } = await socketless().getConnection(name, ["demo"]);

  return (
    <>
      <header>
        <Link href="https://socketless.ws" target="_blank">
          <h1 className="fixed top-0 font-black m-4 hover:scale-125 transition-transform">
            Socketless
          </h1>
        </Link>
      </header>
      <main>
        <ChatWithProvider name={name} url={url} />
      </main>
      <footer className="fixed bottom-0 bg-black p-4 text-white w-full">
        <p className="text-center">
          Note: The contents of the chat are not liable for any damages or consequences. <Link href="https://github.com/wosherco/socketless-nextjs-demo" className="underline">Check it out on Github.</Link>
        </p>
      </footer>
    </>
  );
}