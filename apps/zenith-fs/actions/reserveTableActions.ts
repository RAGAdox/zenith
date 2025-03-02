"use server";

import { reserveTable } from "@/repository/reserve-table";
import { revalidatePath } from "next/cache";

export const postTableReservationData = async (tableId: string) => {
  const result = await reserveTable(tableId);
  if (result) {
    revalidatePath("/reserve-table");
  }
};
