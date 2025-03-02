import "server-only";

import { createClient } from "@/utils/supabase/server";

const reserveTable = async (tableId: string) => {
  const supabase = await createClient();
  const user_id = (await supabase.auth.getUser()).data.user?.id;
  const { error } = await supabase
    .from("table_reservations")
    .insert([{ user_id, table_id: tableId }]);
  if (error) {
    return null;
  }
  return true;
};

const getTableReservation = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("table_reservations")
    .select("table_id,user_id");
  if (error) {
    return null;
  }
  if (data && data.length !== 0) {
    return data[0];
  }
  return null;
};

export { getTableReservation, reserveTable };
