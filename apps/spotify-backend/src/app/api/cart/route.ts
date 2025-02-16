import { getAblyClient } from "@/app/clients";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const cartData: Record<number, number[][]> = await request.json();
    const tableId = (await currentUser())!.publicMetadata.tableId as string;
    const ablyClient = getAblyClient();
    const response = await ablyClient.channels
      .get(`cart:${tableId}`)
      .publish("push", cartData);
    console.log("response===>", response);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
