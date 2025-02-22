import { getAblyClient } from "@/app/clients";
import { catchHttpErrors } from "@/app/utils";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const userId = (await currentUser())!.id;
    const ably = getAblyClient(userId);
    const tokenRequest = await ably.auth.createTokenRequest({
      capability: { [`cart:*`]: ["subscribe", "presence"] },
      clientId: userId,
    });
    return NextResponse.json(tokenRequest);
  } catch (error) {
    return catchHttpErrors(error);
  }
}
