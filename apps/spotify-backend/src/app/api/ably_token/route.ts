import { getAblyClient } from "@/app/clients";
import { catchHttpErrors } from "@/app/utils";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const tableId = (await currentUser())!.publicMetadata.tableId as string;
    const ably = getAblyClient();
    const tokenRequest = await ably.auth.createTokenRequest({
      capability: { [`cart:${tableId}`]: ["subscribe", "presence"] },
      clientId: "cartUser",
    });
    return NextResponse.json(tokenRequest);
  } catch (error) {
    return catchHttpErrors(error);
  }
}
