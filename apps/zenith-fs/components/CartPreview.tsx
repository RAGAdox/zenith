import { getRawCartData } from "@/repository/cart";
import { getTableReservation } from "@/repository/reserve-table";
import { CartItem } from "@/types/cart";
import Button from "./Button";

const CartPreview = async () => {
  const tableReservation = await getTableReservation();
  if (!(tableReservation && tableReservation.table_id)) {
    return <></>;
  }
  const cartData: CartItem[] = await getRawCartData(tableReservation!.table_id);
  if (cartData && cartData.length > 0) {
    return (
      <div className="fixed left-0 right-0 bottom-0 min-h-16 flex items-center justify-between bg-base-100 px-4">
        <span>
          Total Amount -<br /> Rs.
          {cartData.reduce((sum, data) => {
            sum =
              sum +
              data.price +
              (data.customizations
                ? data.customizations?.reduce((nestedSum, customization) => {
                    nestedSum = nestedSum + customization.additional_price;
                    return nestedSum;
                  }, 0)
                : 0);
            return sum;
          }, 0)}
        </span>
        <Button variant="cta">Proceed to place order</Button>
      </div>
    );
  }
  return <></>;
};

export default CartPreview;
