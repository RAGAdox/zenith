import TableReservationForm from "@/components/FormComponents/TableReservationForm";
import { getTableReservation } from "@/repository/reserve-table";
import { redirect, RedirectType } from "next/navigation";

const ReserveTable = async () => {
  const tableReservation = await getTableReservation();
  if (tableReservation && tableReservation.table_id) {
    redirect("/menu", RedirectType.replace);
  }
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <TableReservationForm />
    </div>
  );
};

export default ReserveTable;
