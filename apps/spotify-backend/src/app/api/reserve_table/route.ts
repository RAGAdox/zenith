import { catchHttpErrors, throwHttpErrors } from "@/app/utils";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const tableId = request.nextUrl.searchParams.get("tableId");
    if (!tableId) {
      throwHttpErrors("BAD_REQUEST");
    }
    const userId = (await currentUser())!.id;
    const client = await clerkClient();
    client.users.updateUserMetadata(userId, { publicMetadata: { tableId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return catchHttpErrors(error);
  }
}
