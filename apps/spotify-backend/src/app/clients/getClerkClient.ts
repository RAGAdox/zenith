import { ClerkClient } from "@clerk/backend";
import { createClerkClient } from "@clerk/nextjs/server";
let clerkClient: ClerkClient | null = null;

export default function getClerkClient() {
  if (clerkClient) {
    return clerkClient;
  }
  clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  });
  return clerkClient;
}
