import { create } from "zustand";

type I_CART_STORE = {
  tableId?: string;
  data: Record<number, number[][]>;
};

const CART_STORE = create<I_CART_STORE>()(() => ({
  data: {},
}));

export function setTable(tableId: string) {
  CART_STORE.setState((store: I_CART_STORE) => ({
    ...store,
    tableId: tableId,
  }));
}

export function addToCart(id: number, customizationIds: number[]) {
  CART_STORE.setState((store: I_CART_STORE) => ({
    ...store,
    data: {
      ...store.data,
      [id]: [...(store.data[id] ?? []), customizationIds],
    },
  }));
}

export function removeFromCart(id: number) {
  CART_STORE.setState((store: I_CART_STORE) => ({
    ...store,
    data: {
      ...store.data,
      [id]: [...(store.data[id] ?? []).slice(0, -1)],
    },
  }));
}

export default CART_STORE;
