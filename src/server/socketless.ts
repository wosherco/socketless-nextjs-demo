import { createSocketless } from "socketless.ws/server";

export const socketless = createSocketless({
  clientId: process.env.SOCKETLESS_CLIENT_ID!,
  token: process.env.SOCKETLESS_TOKEN!,
  url: process.env.SOCKETLESS_URL!,
  onConnect(context, identifier) {
    console.log("User connected", identifier);
    context.send(`${identifier} connected`, { rooms: ["demo"] });
  },
  onDisconnect(context, identifier) {
    console.log("User disconnected", identifier);
    context.send(`${identifier} disconnected`, { rooms: ["demo"] });
  },
  onMessage(context, identifier, message) {
    console.log("Message received", message);
    context.send(`${identifier}: "${message}"`, { rooms: ["demo"] });
  },
});
