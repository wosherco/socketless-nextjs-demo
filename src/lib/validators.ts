import { z } from "zod";

export const MessageSchema = z.object({
  message: z.string().min(1).max(512),
});
