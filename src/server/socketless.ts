import { createSocketless } from "socketless.ws/server";

export const socketless = createSocketless({
  clientId: process.env.SOCKETLESS_CLIENT_ID!,
  token: process.env.SOCKETLESS_TOKEN!,
  url: process.env.SOCKETLESS_URL!,
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
