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

export const popFromCart = async (tableId: string, menuId: number) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("cart")
    .delete()
    .eq("table_id", tableId)
    .eq("menu_id", menuId)
    .order("created_at", { ascending: false }) // Order by latest
    .limit(1);
  if (error) {
    return null;
  }
  return true;  
};

export const deleteFromCart = async (id: string) => {
  const supabase = await createClient();
  const { error } = await supabase.from("cart").delete().eq("id", id);
  if (error) {
    console.error(error);
    return null;
  }
  return true;
};
