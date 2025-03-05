"use client";
import { deleteFromCart } from "@/actions/cartActions";
import { CartItem } from "@/types/cart";
import { Trash2 } from "lucide-react";
import Button from "./Button";

interface CartItemProps {
  cartData: CartItem;
}

const CartItemCard = ({ cartData }: CartItemProps) => {
  return (
    <div className="card flex flex-row bg-base-100 prose justify-between">
      <div className="flex flex-col">
        <div className="card-body flex-1 ">
          <h4 className="mt-0">{cartData.name}</h4>
          <div className="flex flex-row flex-wrap">
            {cartData.customizations &&
              cartData.customizations
                .map((customization) => customization.name)
                .join(" ◈ ")}
          </div>
        </div>
        <div className="card-actions px-8 pb-2">
          <span>
            Total - Rs.
            {cartData.price +
              (cartData.customizations
                ? cartData.customizations?.reduce((sum, customization) => {
                    sum = sum + customization.additional_price;
                    return sum;
                  }, 0)
                : 0)}
            /-
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-2 p-2">
        <Button
          onClick={() => deleteFromCart(cartData._id)}
          className="btn-circle btn-ghost"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default CartItemCard;
