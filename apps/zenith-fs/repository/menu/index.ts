import "server-only";

import { createClient } from "@/utils/supabase/server";

const getMenu = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("menu")
    .select("id,name,price,item_customization(id,name,additional_price)");
  if (error) {
    console.error(error);
    return null;
  }
  return data;
};

export { getMenu };
