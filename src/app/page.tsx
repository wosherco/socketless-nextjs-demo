import Chat from "@/components/Chat";
import { socketless } from "@/server/socketless";
import { cookies } from "next/headers";
import { generate } from "random-words";

export default async function Home() {
  let name = cookies().get("socketless_name")?.value;
  let url = cookies().get("socketless_url")?.value;

  if (!name || !url) {
    name = generate({
      exactly: 4, join: "", formatter: (word, index) => {
        return index === 0
          ? word.slice(0, 1).toUpperCase().concat(word.slice(1))
          : word;
      },
    })

    const response = await socketless.getConnection(name, ["demo"]);
    url = response.url;
  }

  return (
    <main>
      <Chat websocketUrl={url} name={name} />
    </main>
  );
}