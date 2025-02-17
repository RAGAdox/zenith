import { getRedisClient } from "@/app/clients";

const getCartKey = (tableId: string): string => {
  return `cart:${tableId}`;
};
async function createCartByTableId(tableId: string) {
  const client = getRedisClient();
  await client.hset(getCartKey(tableId), { 10: [[101, 102], [], [101]] });
}

async function getCart(
  tableId: string
): Promise<Record<number, number[][]> | null> {
  const client = getRedisClient();
  const cartData = await client.hgetall(getCartKey(tableId));
  if (cartData) {
    return cartData as Record<number, number[][]>;
  }
  return null;
}

async function getCartItem(
  tableId: string,
  itemId: number
): Promise<number[][] | null> {
  const client = getRedisClient();
  const itemData = await client.hget(getCartKey(tableId), itemId.toString());
  return itemData ? (itemData as number[][]) : null;
}

async function setCartItem(
  tableId: string,
  itemId: number,
  customizationIds: number[][]
) {
  const client = getRedisClient();
  await client.hset(tableId, { [itemId]: customizationIds });
}

export async function addItemToCart(
  tableId: string,
  itemId: number,
  customizationIds: number[]
) {
  const existingCartItem = await getCartItem(tableId, itemId);

  if (!existingCartItem) {
    await createCartByTableId(tableId);
  }
  await setCartItem(tableId, itemId, [
    ...(existingCartItem ?? []),
    customizationIds,
  ]);
}

export async function removeFromCart(tableId: string, itemId: number) {
  const existingCartItem = await getCartItem(tableId, itemId);
  if (!existingCartItem) {
    return;
  }
  await setCartItem(tableId, itemId, [
    ...(existingCartItem ?? []).slice(0, -1),
  ]);
}

export async function retriveCart(
  tableId: string
): Promise<Record<number, number[][]> | null> {
  return await getCart(tableId);
}
