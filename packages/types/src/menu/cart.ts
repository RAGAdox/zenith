export interface IAddon {
  itemId: string;
  quantity: number;
}

export interface IItem {
  itemId: string;
  customizations?: {
    customizationId: string;
  };
  quantity: number;
  addOns?: IAddon[];
}

export interface ICart {
  cartId: string;
  items: IItem[];
}
