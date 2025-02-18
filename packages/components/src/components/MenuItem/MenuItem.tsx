import { IMenuItemSelect } from "@zenith/types";
import { Button } from "../Button";

interface MenuItemProps extends IMenuItemSelect {
  variant?: "full" | "small";
  itemsInCart?: number[][];
  handleOpenModal: () => void;
  onAddToCart: (itemId: number, customizationIds: number[]) => void;
  onRemoveFromCart: (itemId: number) => void;
}
const MenuItem = ({
  itemsInCart = [],
  id,
  name,
  description,
  price,
  imageUrl,
  handleOpenModal,
  onRemoveFromCart,
}: MenuItemProps) => {
  return (
    <div className="card card-xs bg-base-100 shadow-sm max-w-sm">
      <figure className="mt-0 mb-0 aspect-video">
        <img src={imageUrl!} alt={name} />
      </figure>
      <div className="card-body prose-invert p-4">
        <h2 className="card-title !m-0">{name}</h2>
        <p className="!m-0">{description}</p>

        <div className="card-actions items-center justify-between">
          <h4 className="!m-0 text-bold">Rs.{price}/-</h4>
          {itemsInCart.length === 0 ? (
            <Button onClick={handleOpenModal} className="w-[120px]">
              Add to cart
            </Button>
          ) : (
            <div className="join join-horizontal flex flex-row items-stretch justify-between w-[120px]">
              <Button
                onClick={() => onRemoveFromCart(id)}
                className="btn join-item"
              >
                -
              </Button>
              <div className="join-item flex-grow flex justify-center items-center text-center border-t border-b border-base-200">
                {itemsInCart.length}
              </div>
              <Button onClick={handleOpenModal} className="btn join-item">
                +
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export type { MenuItemProps };
export default MenuItem;
