import { generateSocketlessReact } from "@socketless/react";
import { z } from "zod";

export const MessageSchema = z.object({
  message: z.string().min(1).max(512),
});

export const { SocketlessProvider, useSocketless, useSocketlessWebsocket } =
  generateSocketlessReact<z.infer<typeof MessageSchema>, string>();
