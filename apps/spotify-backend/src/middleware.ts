import { Receiver } from "@upstash/qstash";
import { NextRequest, NextResponse } from "next/server";
import { getClerkClient } from "./app/clients";
import { catchHttpErrors, throwHttpErrors } from "./app/utils";

export async function middleware(request: NextRequest) {
  try {
    if (request.nextUrl.pathname === "/api/refresh") {
      const receiver = new Receiver({
        currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY || "",
        nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY || "",
      });

      const signature = request.headers.get("Upstash-Signature") || "";

      const rawBody = await request.text();

      const isValid = await receiver.verify({
        signature: signature,
        body: rawBody,
      });

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
