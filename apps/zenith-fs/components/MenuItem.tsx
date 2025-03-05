"use client";

import { addToCart, popFromCart } from "@/actions/cartActions";
import { cartDataItem } from "@/repository/cart";
import { MenuItem } from "@/types/menu";
import { ChangeEvent, RefObject, useRef, useState } from "react";
import Button from "./Button";

interface MenuProps {
  tableId: string;
  item: MenuItem;
  cartItem?: cartDataItem;
}

interface ItemCustomizationsProps {
  tableId: string;
  ref: RefObject<HTMLDialogElement | null>;
  item: MenuItem;
}

const ItemCustomizations = ({
  ref,
  item,
  tableId,
}: ItemCustomizationsProps) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const onChnageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds((ids) => [...ids, parseInt(e.target.id)]);
    } else {
      setSelectedIds((ids) => ids.filter((id) => id !== parseInt(e.target.id)));
    }
  };
  const handleClick = () => {
    addToCart(tableId, item.id, selectedIds);
    setSelectedIds([]);
    ref.current?.close();
  };

  return (
    <dialog ref={ref} id="item-customization-modal" className="modal">
      <div className="modal-box prose ">
        <h4>Customize your order</h4>
        <p>{selectedIds}</p>

        {item.item_customization.map((ic) => {
          return (
            <label key={ic.id} className="flex flex-row gap-2">
              <input
                id={ic.id}
                type="checkbox"
                className="checkbox"
                onChange={onChnageHandler}
                checked={selectedIds.includes(ic.id)}
              />
              <div className="flex-1 flex justify-between">
                <span>{ic.name}</span>
                <span>{ic.additional_price}</span>
              </div>
            </label>
          );
        })}

        <Button variant="cta" className=" float-end" onClick={handleClick}>
          Proceed
        </Button>
      </div>
    </dialog>
  );
};

const MenuItemCard = ({ item, tableId, cartItem }: MenuProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <div className="card prose bg-base-100 max-w-xs">
        <figure>
          <img
            src={`https://placehold.co/600x400?text=${item.name}`}
            alt={item.name}
          />
        </figure>
        <div className="card-body p-4">
          <h4 className="mt-0 mb-0">{item.name}</h4>
          <div className="card-actions justify-between items-center">
            <span>{item.price}</span>
            {(cartItem && cartItem.customizationids.length === 0) ||
            !cartItem ? (
              <Button
                variant="cta"
                onClick={() => modalRef.current?.showModal()}
              >
                Add to cart
              </Button>
            ) : (
              <div className="join">
                <Button
                  variant="cta"
                  className=" rounded-l-4xl"
                  onClick={() => popFromCart(tableId, item.id)}
                >
                  -
                </Button>
                <Button>{cartItem.customizationids.length}</Button>
                <Button
                  variant="cta"
                  className=" rounded-r-4xl"
                  onClick={() => modalRef.current?.showModal()}
                >
                  +
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ItemCustomizations ref={modalRef} item={item} tableId={tableId} />
    </>
  );
};

export default MenuItemCard;
