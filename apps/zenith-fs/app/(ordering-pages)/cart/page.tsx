import CartItemCard from "@/components/CartItem";
import { getRawCartData } from "@/repository/cart";
import { getTableReservation } from "@/repository/reserve-table";
import { CartItem } from "@/types/cart";

const CartPage = async () => {
  const tableReservation = await getTableReservation();
  const cartData: CartItem[] = await getRawCartData(tableReservation!.table_id);
  return (
    <div className="flex-1 flex flex-col gap-4 max-w-md w-full p-4">
      {cartData.map((data) => (
        <CartItemCard key={data._id} cartData={data} />
      ))}
    </div>
  );
};

export default CartPage;
