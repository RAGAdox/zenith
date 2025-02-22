import { reserveTable, retriveTableId } from "@/app/services/table-storage";
import { catchHttpErrors, throwHttpErrors } from "@/app/utils";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { tableId } = await request.json();
    if (!tableId) {
      throwHttpErrors("BAD_REQUEST");
      return;
    }
    const userId = (await currentUser())!.id;
    await reserveTable({ tableId, userId });
    return NextResponse.json({ success: true, result: { tableId } });
  } catch (error) {
    return catchHttpErrors(error);
  }
}

export async function GET() {
  try {
    const userId = (await currentUser())!.id;
    const tableId = await retriveTableId(userId);
    if (!tableId) {
      return NextResponse.json({
        success: false,
        error: "NO_RESERVATION_FOUND",
      });
    }
    return NextResponse.json({ success: true, result: { tableId } });
  } catch (error) {
    return catchHttpErrors(error);
  }
}
