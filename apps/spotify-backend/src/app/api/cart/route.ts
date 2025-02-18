import { getAblyClient } from "@/app/clients";
import {
  addItemToCart,
  removeFromCart,
  retriveCart,
} from "@/app/services/cart-storage";
import { retriveTableId } from "@/app/services/table-storage";
import { catchHttpErrors, throwHttpErrors } from "@/app/utils";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const userId = (await currentUser())!.id;
    const tableId = await retriveTableId(userId);
    if (!tableId) {
      throwHttpErrors("AUTHORIZATION_ERROR");
      return;
    }
    const cartData = await retriveCart(tableId);
    if (!cartData) {
      return NextResponse.json({ success: false, error: "NO_CART_FOUND" });
    }
    return NextResponse.json({ result: cartData, success: true });
  } catch (error) {
    return catchHttpErrors(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { id, customizationIds } = await request.json();
    const userId = (await currentUser())!.id;
    const tableId = await retriveTableId(userId);
    if (!tableId) {
      throwHttpErrors("AUTHORIZATION_ERROR");
      return;
    }
    await addItemToCart(tableId, id, customizationIds);
    const ablyClient = getAblyClient(userId);
    await ablyClient.channels
      .get(`cart:${tableId}`)
      .publish("push", { id, customizationIds });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    const userId = (await currentUser())!.id;
    const tableId = await retriveTableId(userId);
    if (!tableId) {
      throwHttpErrors("AUTHORIZATION_ERROR");
      return;
    }
    await removeFromCart(tableId, id);
    const ablyClient = getAblyClient(userId);
    await ablyClient.channels.get(`cart:${tableId}`).publish("pop", { id });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
