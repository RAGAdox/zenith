import { IMenuItemSelect } from "@zenith/types";
import { useRef, useState } from "react";
import { Loader } from "../components/Loader";

import { MenuItem, SelectCustomizations } from "@zenith/components";
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
  const modalRef = useRef<HTMLDialogElement>(null);
  const [currentItem, setCurrentItem] = useState<IMenuItemSelect>();

  const handleAddToCart = (id: number, customizationIds: number[]) => {
    setCart((currentCart) => {
      return {
        ...currentCart,
        [id]: [...(currentCart[id] ?? []), customizationIds],
      };
    });
    modalRef.current?.close();
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
              handleOpenModal={() => {
                setCurrentItem(item);
                modalRef.current?.showModal();
              }}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              itemsInCart={cart[item.id] ?? []}
            />
          ))}
        </div>

        <SelectCustomizations
          ref={modalRef}
          onAddToCart={handleAddToCart}
          item={currentItem}
        />

        {/* <div className="flex flex-col justify-center">
          {Object.entries(cart).map(([key, value], index) => {
            const item = data.find(
              (i: IMenuItemSelect) => i.id === Number(key)
            );

            return (
              <div key={`${index}-${key}`} className="flex flex-col">
                {value.map((customizationIds: number[], customizationIndex) => {
                  const customizations =
                    item.customizations?.filter((c: any) =>
                      customizationIds.includes(c.id)
                    ) ?? [];

                  return (
                    <ul>
                      {item.name}

                      {customizations.map((c: any, ciIndex: number) => (
                        <li
                          key={`${index}-${item.id}-${customizationIndex}-${c.name}`}
                        >
                          {c.name}
                        </li>
                      ))}
                    </ul>
                  );
                })}
              </div>
            );
          })}
        </div> */}
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
