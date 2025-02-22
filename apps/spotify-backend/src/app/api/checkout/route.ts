import { retriveCart } from "@/app/services/cart-storage";
import { retriveTableId } from "@/app/services/table-storage";
import { catchHttpErrors, throwHttpErrors } from "@/app/utils";
import { currentUser } from "@clerk/nextjs/server";
import { getCartItems } from "@zenith/repository";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userId = (await currentUser())!.id;
    const tableId = await retriveTableId(userId);
    if (!tableId) {
      throwHttpErrors("AUTHORIZATION_ERROR");
      return;
    }
    const currentCartIds = await retriveCart(tableId);
    if (!currentCartIds) {
      return new NextResponse(null, { status: 204 });
    }
    const currentCart = await getCartItems(currentCartIds);
    let cost = 0.0;

    currentCart.forEach((cartItem) => {
      cost += parseFloat(cartItem.price);
      if (cartItem.customizations && cartItem.customizations.length > 0) {
        cost += cartItem.customizations.reduce((val, customization) => {
          val += parseFloat(customization.additionalPrice);
          return val;
        }, 0);
      }
    });

    return NextResponse.json({ currentCart, itemTotal: cost });
  } catch (error) {
    return catchHttpErrors(error);
  }
}
