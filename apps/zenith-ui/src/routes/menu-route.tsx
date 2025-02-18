import { IMenuItemSelect } from "@zenith/types";
import { useEffect, useRef, useState } from "react";
import { Loader } from "../components/Loader";

import { MenuItem, SelectCustomizations } from "@zenith/components";
import { useNavigate } from "react-router";
import useFetch, { FETCH_DATA } from "../hooks/useFetch";
import CART_STORE, { addToCart, removeFromCart } from "../store/cartStore";

const MenuRoute = () => {
  const navigate = useNavigate();
  const { isSuccess, data, isFetching, isLoaded, isError, error } = useFetch(
    "menu",
    {
      method: "GET",
      isProtectedApi: true,
      executeOnMount: true,
    }
  );
  const cart = CART_STORE((store) => store.data);
  const tableId = FETCH_DATA((store) => store.table.data?.tableId);
  const { execute: postCart } = useFetch("cart", {
    method: "POST",
    isProtectedApi: true,
    executeOnMount: false,
    localCache: false,
  });

  const { execute: popCart } = useFetch("cart", {
    method: "DELETE",
    isProtectedApi: true,
    executeOnMount: false,
    localCache: false,
  });

  const modalRef = useRef<HTMLDialogElement>(null);
  const [currentItem, setCurrentItem] = useState<IMenuItemSelect>();

  useEffect(() => {
    if (!tableId) {
      navigate("/table");
      return;
    }
  }, []);

  const handleAddToCart = async (id: number, customizationIds: number[]) => {
    addToCart(id, customizationIds);
    postCart({
      requestData: { tableId, id, customizationIds },
      force: true,
    });

    modalRef.current?.close();
  };

  const handleRemoveFromCart = (id: number) => {
    removeFromCart(id);
    popCart({ requestData: { id }, force: true });
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
