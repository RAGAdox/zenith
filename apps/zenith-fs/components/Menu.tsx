"use client";
import { MenuItem } from "@/types/menu";
import { ChangeEvent, RefObject, useRef, useState } from "react";
import Button from "./Button";

interface MenuProps {
  item: MenuItem;
}

interface ItemCustomizationsProps {
  ref: RefObject<HTMLDialogElement | null>;
  item: MenuItem;
}

const ItemCustomizations = ({ ref, item }: ItemCustomizationsProps) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const onChnageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedIds((ids) => [...ids, parseInt(e.target.id)]);
  };
  const handleClick = () => {
    console.log("selectedIds", selectedIds);
    ref.current?.close();
  };
  return (
    <dialog ref={ref} id="item-customization-modal" className="modal">
      <div className="modal-box prose ">
        <h4>Customize your order</h4>
        <ul>
          {item.item_customization.map((ic) => {
            return (
              <li key={ic.id} className="flex flex-row gap-2">
                <input
                  id={ic.id}
                  type="checkbox"
                  className="checkbox"
                  onChange={onChnageHandler}
                />
                <div className="flex-1 flex justify-between">
                  <span>{ic.name}</span>
                  <span>{ic.additional_price}</span>
                </div>
              </li>
            );
          })}
        </ul>
        <Button className=" float-end" onClick={handleClick}>
          Proceed
        </Button>
      </div>
    </dialog>
  );
};

const Menu = ({ item }: MenuProps) => {
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
            <Button onClick={() => modalRef.current?.showModal()}>
              Add to cart
            </Button>
          </div>
        </div>
      </div>
      <ItemCustomizations ref={modalRef} item={item} />
    </>
  );
};

export default Menu;
