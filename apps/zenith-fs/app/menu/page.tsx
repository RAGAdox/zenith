import Menu from "@/components/Menu";
import { getMenu } from "@/repository/menu";
import { getTableReservation } from "@/repository/reserve-table";
import { redirect } from "next/navigation";

const MenuPage = async () => {
  const tableReservation = await getTableReservation();
  if (!(tableReservation && tableReservation.table_id)) {
    redirect("/reserve-table");
  }
  const menuData = await getMenu();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center w-full p-4 gap-4">
      {menuData && menuData.map((item) => <Menu item={item} key={item.id} />)}
    </div>
  );
};

export default MenuPage;
