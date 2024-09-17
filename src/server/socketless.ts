import { createSocketless } from "socketless.ws/server";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { z } from "zod";
import { MessageSchema } from "@/lib/validators";

/// Create a new Socketless server on normal environments
// export const socketless = createSocketless({

/// Since we are using Cloudflare Workers, we need to use the following code instead
export const socketless = () =>
  createSocketless<z.infer<typeof MessageSchema>, string>({
    // clientId: process.env.SOCKETLESS_CLIENT_ID!,
    // token: process.env.SOCKETLESS_TOKEN!,
    clientId: getRequestContext().env.SOCKETLESS_CLIENT_ID,
    token: getRequestContext().env.SOCKETLESS_TOKEN,

    // url: process.env.SOCKETLESS_URL!,
    url: getRequestContext().env.SOCKETLESS_URL,

    messageValidator: MessageSchema,

    onConnect(context, identifier) {
      console.log("User connected", identifier);
      context.toFeed("demo").send(`${identifier} connected`);
    },
    onDisconnect(context, identifier) {
      console.log("User disconnected", identifier);
      context.toFeed("demo").send(`${identifier} disconnected`);
    },
    onMessage(context, identifier, message) {
      console.log("Message received", message);
      context.toFeed("demo").send(`${identifier}: "${message}"`);
    },
  });
