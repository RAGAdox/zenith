import { clerkMiddleware } from "@clerk/nextjs/server";
import { catchHttpErrors, throwHttpErrors } from "./app/utils";

export default clerkMiddleware(
  async (auth, request) => {
    try {
      const { userId } = await auth();
      if (!userId && request.method !== "OPTIONS") {
        throwHttpErrors("AUTHENTICATION_ERROR");
      }
    } catch (error) {
      return catchHttpErrors(error);
    }
  },
  {
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  }
);

export const config = {
  matcher: "/api/((?!callback).*)",
};
