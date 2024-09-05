import { socketless } from "@/server/socketless";

export const runtime = "edge";

export const { POST } = socketless.generateRoutes();
