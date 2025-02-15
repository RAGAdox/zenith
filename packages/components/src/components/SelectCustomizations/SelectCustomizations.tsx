import { IMenuItemSelect } from "@zenith/types";
import { forwardRef, useState } from "react";
import { Button } from "../Button";

interface SelectCustomizationsProps {
  item: IMenuItemSelect;
  onAddToCart: (itemId: number, customizationIds: number[]) => void;
}
const SelectCustomizations = forwardRef<
  HTMLDialogElement,
  SelectCustomizationsProps
>(({ item, onAddToCart }: SelectCustomizationsProps, ref) => {
  const { id, customizations } = item;
  const [selectedCustomizations, setSelectedCustomizations] = useState<
    number[]
  >([]);
  return (
    <dialog
      ref={ref}
      id={`customizations-${id}`}
      className="select-customizations modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3>Customize your order</h3>
        <div className="flex flex-col">
          {customizations?.map(({ id, name, additionalPrice }) => (
            <label key={id} className="label cursor-pointer">
              <input
                type="checkbox"
                className="checkbox"
                onChange={() => {
                  if (selectedCustomizations.includes(id)) {
                    setSelectedCustomizations(
                      selectedCustomizations.filter((item) => item !== id)
                    );
                  } else {
                    setSelectedCustomizations([...selectedCustomizations, id]);
                  }
                }}
              />
              <div className="flex-grow flex flex-row justify-between">
                <span>{name}</span>
                <span>{additionalPrice}</span>
              </div>
            </label>
          ))}
        </div>
        <div className="modal-action">
          <Button
            onClick={() => {
              onAddToCart(id, selectedCustomizations);
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </dialog>
  );
});

export default SelectCustomizations;
