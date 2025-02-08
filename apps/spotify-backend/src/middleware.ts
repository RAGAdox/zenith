import { getClerkClient } from "@/app/clients";
import verifyQStashAPI from "@/app/services/verify-QStash";
import { catchHttpErrors, throwHttpErrors } from "@/app/utils";
import { NextRequest, NextResponse } from "next/server";

const QStashAPIs = ["/api/refresh"];

export async function middleware(request: NextRequest) {
  try {
    if (QStashAPIs.includes(request.nextUrl.pathname)) {
      const isValid = await verifyQStashAPI(request);
      if (isValid) {
        return NextResponse.next();
      }
    }

    const client = getClerkClient();
    const { isSignedIn } = await client.authenticateRequest(request);
    if (!isSignedIn && request.method !== "OPTIONS") {
      throwHttpErrors("AUTHENTICATION_ERROR");
    }
    NextResponse.next();
  } catch (error: any) {
    return catchHttpErrors(error);
  }
}

export const config = {
  matcher: "/api/((?!callback).*)",
};
