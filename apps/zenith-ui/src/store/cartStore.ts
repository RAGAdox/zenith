import { create } from "zustand";

type I_CART_STORE = Record<number, number[][]>;

const CART_STORE = create<I_CART_STORE>(() => ({}));

export function addToCart(id: number, customizationIds: number[]) {
  CART_STORE.setState((store: I_CART_STORE) => ({
    ...store,
    [id]: [...(store[id] ?? []), customizationIds],
  }));
}

export function removeFromCart(id: number) {
  CART_STORE.setState((store: I_CART_STORE) => ({
    ...store,
    [id]: [...(store[id] ?? []).slice(0, -1)],
  }));
}

export default CART_STORE;
