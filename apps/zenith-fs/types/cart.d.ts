interface CartItemCustomization {
  id: number;
  name: string;
  additional_price: number;
}

export interface CartItem {
  _id: string;
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  customizations: CartItemCustomization[] | null;
}
