"use client";

import { SocketlessProvider } from "@/lib/socketless";
import Chat from "./Chat";

export default function Test({ url, name }: { url: string; name: string; }) {
  return <SocketlessProvider url={url}>
    <Chat name={name} />
  </SocketlessProvider>
}