import { IMenuItemSelect } from "@zenith/types";
import { useState } from "react";
import { Loader } from "../components/Loader";

import { MenuItem } from "@zenith/components";
import useFetch from "../hooks/useFetch";

const MenuRoute = () => {
  // TODO: Need to set isProtectedApi to false
  const { isSuccess, data, isFetching, isLoaded, isError, error } = useFetch(
    "menu",
    {
      method: "GET",
      isProtectedApi: true,
      // executeOnMount: true,
    }
  );
  const [cart, setCart] = useState<Record<number, number[][]>>({});

  const handleAddToCart = (id: number, customizationIds: number[]) => {
    setCart((currentCart) => {
      return {
        ...currentCart,
        [id]: [...(currentCart[id] ?? []), customizationIds],
      };
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((currentCart) => {
      return {
        ...currentCart,
        [id]: [...currentCart[id].slice(0, -1)],
      };
    });
  };

  if (isSuccess) {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 p-8">
          {data.map((item: IMenuItemSelect) => (
            <MenuItem
              key={item.id}
              {...item}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              itemsInCart={cart[item.id] ?? []}
            />
          ))}
        </div>
        <div className="flex justify-center">
          {Object.entries(cart).map(([key, value]) => {
            const item = data.find(
              (i: IMenuItemSelect) => i.id === Number(key)
            );

            return (
              <div className="flex flex-col">
                {value.map((customizationIds: number[]) => {
                  const customizations =
                    item.customizations?.filter((c: any) =>
                      customizationIds.includes(c.id)
                    ) ?? [];

                  return (
                    <p>
                      {item.name}
                      {" - "}
                      {customizations.map((c: any) => c.name).join("ø")}
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }

  if (isError) {
    throw new Response(error, { status: 401 });
  }

  if (isFetching || !isLoaded) {
    return <Loader />;
  }
};

export default MenuRoute;
