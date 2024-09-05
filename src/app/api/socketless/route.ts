import { socketless } from "@/server/socketless";

export const runtime = "edge";

/// In a normal environment, you would use the following code
// export const { POST } = socketless.generateRoutes();

/// Since we are using Cloudflare Workers, we need to use the following code instead to be able to get the request context
export function POST(request: Request) {
  return socketless().generateRoutes().POST(request);
}
