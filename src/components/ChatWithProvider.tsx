"use client";

import { SocketlessProvider } from "@/lib/socketless";
import Chat from "./Chat";

export default function ChatWithProvider({ url, name }: { url: string; name: string; }) {
  // Because it's a provider using react, it needs to be from a client component
  return <SocketlessProvider url={url}>
    <Chat name={name} />
  </SocketlessProvider>
}