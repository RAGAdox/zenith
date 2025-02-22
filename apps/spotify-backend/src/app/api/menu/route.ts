export const runtime = "edge";
import { addMenu, getMenu } from "@zenith/repository";
import { IMenuItemInsert, IMenuItemSelect } from "@zenith/types";
import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  try {
    const menu: IMenuItemSelect[] = await getMenu();

    return NextResponse.json({ success: true, result: menu });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function POST(request: NextRequest) {
  try {
    const menuData: IMenuItemInsert = await request.json();
    const result: IMenuItemSelect = await addMenu(menuData);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
