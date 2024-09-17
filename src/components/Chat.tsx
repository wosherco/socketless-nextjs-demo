"use client";

import { useSocketless } from "@/lib/socketless";
import { Loader, Send } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

function MessagesHistory({ messages }: { messages: string[] }) {
  return <div className="flex flex-col gap-2">
    {messages.map((message) =>
      <p key={message}>
        {message}
      </p>
    )}
  </div>
}

export default function Chat({ name }: { name: string; }) {
  // Opening websocket and creating a message history
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const { client, lastMessage } = useSocketless();

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const [message, setMessage] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const length = message.trim().length;
    if (length <= 0 || length >= 950) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [message, setValid]);

  const sendMessageCallback = useCallback(() => {
    if (!valid) return;

    client?.send({
      message
    })
    setMessage("");
  }, [valid, client, message])

  return <div className="h-screen w-full flex items-center justify-center">
    <Card className="max-w-[500px] w-full mx-4">
      <CardHeader>
        <CardTitle>
          Chat
        </CardTitle>
        <CardDescription>
          You are <b>{name}</b>
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[400px]">
        {
          client?.getState() === "CONNECTED" ?

            // Socket is connected, showing messages
            <MessagesHistory messages={messageHistory} /> :

            // Socket is connecting, showing spinner
            <div className="w-full min-h-[390px] flex items-center justify-center">
              <Loader className="animate-spin" />
            </div>
        }
      </CardContent>
      <CardFooter>
        <div className="flex flex-row gap-2 w-full">
          <form className="w-full flex-grow" onSubmit={(e) => {
            e.preventDefault();
            sendMessageCallback();
          }}>
            <Input value={message} onChange={(e) => setMessage(e.target.value)} />
          </form>
          <Button disabled={!valid} onClick={sendMessageCallback}>
            <Send />
          </Button>
        </div>
      </CardFooter>
    </Card>
  </div>
}