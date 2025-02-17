import { reserveTable, retriveTableId } from "@/app/services/table-storage";
import { catchHttpErrors, throwHttpErrors } from "@/app/utils";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { tableId } = await request.json();
    // const tableId = request.nextUrl.searchParams.get("tableId");
    if (!tableId) {
      throwHttpErrors("BAD_REQUEST");
      return;
    }
    const userId = (await currentUser())!.id;
    await reserveTable({ tableId, userId });
    return NextResponse.json({ success: true, tableId });
  } catch (error) {
    return catchHttpErrors(error);
  }
}

export async function GET() {
  try {
    const userId = (await currentUser())!.id;
    const tableId = await retriveTableId(userId);
    if (!tableId) {
      return new NextResponse(null, { status: 204 });
    }
    return NextResponse.json({ tableId });
  } catch (error) {
    return catchHttpErrors(error);
  }
}
