import { createClient } from "@/utils/supabase/server";
import "server-only";
import { getTableReservation } from "../reserve-table";

export type cartDataItem = {
  id: number;
  customizationids: number[];
};
const getCartData = async (): Promise<cartDataItem[] | null> => {
  const supabase = await createClient();
  const tableReservation = await getTableReservation();
  const { data, error } = await supabase.rpc("get_cart_data", {
    p_table_id: tableReservation!.table_id,
  });
  if (error) {
    console.error(error);
    return null;
  }
  return data;
};

const getCartCount = async (tableId: string): Promise<number | null> => {
  const supabase = await createClient();
  const { count } = await supabase
    .from("cart")
    .select("id", { count: "exact", head: true })
    .eq("table_id", tableId);

  return count;
};

export { getCartCount, getCartData };
