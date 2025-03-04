"use server";
import { createClient } from "@/utils/supabase/server";

export const addToCart = async (
  tableId: string,
  menuId: number,
  customizationIds: number[]
) => {
  const supabase = await createClient();

  const { error } = await supabase.from("cart").insert({
    table_id: tableId,
    menu_id: menuId,
    customizations: customizationIds,
  });
  if (error) {
    return null;
  }
  return true;
};
