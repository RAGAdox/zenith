import { createClient } from "@/utils/supabase/server";

const addToCart = async (
  tableId: string,
  menuId: number,
  customizationIds: number[]
) => {
  const supabase = await createClient();
  const {} = await supabase.from("cart").insert({
    table_id: tableId,
    menu_id: menuId,
    customizations: customizationIds,
  });
};
