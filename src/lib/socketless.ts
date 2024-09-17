import { generateSocketlessReact } from "@socketless/react";
import { z } from "zod";
import { MessageSchema } from "./validators";

export const { SocketlessProvider, useSocketless, useSocketlessWebsocket } =
  generateSocketlessReact<z.infer<typeof MessageSchema>, string>();
