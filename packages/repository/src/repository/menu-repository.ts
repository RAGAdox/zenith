import { inArray, InferInsertModel, InferSelectModel } from "drizzle-orm";
import { getDrizzleDB } from "../database/db";
import { itemCustomizations, menuItems } from "../schema";

export interface IMenuItemSelect extends InferSelectModel<typeof menuItems> {
  customizations?: InferSelectModel<typeof itemCustomizations>[];
}

export interface IMenuItemInsert extends InferInsertModel<typeof menuItems> {
  customizations?: Omit<
    InferInsertModel<typeof itemCustomizations>,
    "menuItemId"
  >[];
}

export interface IMenuItemCustomizationSelect
  extends InferSelectModel<typeof itemCustomizations> {}

export async function getMenu(): Promise<IMenuItemSelect[]> {
  const db = getDrizzleDB();

  const menuItems = await db.query.menuItems.findMany({
    with: {
      customizations: true,
    },
  });
  return menuItems;
}
export async function addMenu(data: IMenuItemInsert): Promise<IMenuItemSelect> {
  const db = getDrizzleDB();

  const result = await db.transaction(async (tx) => {
    const [newMenuItem] = await tx
      .insert(menuItems)
      .values({ ...data })
      .returning();
    const newCustomizations = data.customizations
      ? await tx
          .insert(itemCustomizations)
          .values([
            ...data.customizations.map((value) => ({
              ...value,
              menuItemId: newMenuItem.id,
            })),
          ])
          .returning()
      : undefined;

    const item = { ...newMenuItem, customizations: newCustomizations };
    return item;
  });

  return result;
}

export async function getCartItems(
  cart: Record<number, number[][]>
): Promise<IMenuItemSelect[]> {
  const db = getDrizzleDB();
  const itemIds = Object.keys(cart).map((v) => parseInt(v));
  const cartValues = Object.values(cart);
  const customizationIds = new Set(
    cartValues.flat(Infinity).filter((v): v is number => typeof v === "number")
  );
  const items = await db
    .select()
    .from(menuItems)
    .where(inArray(menuItems.id, itemIds));
  const itemsRecord: Record<number, (typeof items)[0]> = items.reduce(
    (record, value) => {
      record[value.id] = value;
      return record;
    },
    {} as Record<number, (typeof items)[0]>
  );

  const customizations = await db
    .select()
    .from(itemCustomizations)
    .where(inArray(itemCustomizations.id, Array.from(customizationIds)));

  const customizationRecord: Record<number, (typeof customizations)[0]> =
    customizations.reduce((record, value) => {
      record[value.id] = value;
      return record;
    }, {} as Record<number, (typeof customizations)[0]>);

  const cartEntries = Object.entries(cart);
  const cartArray: IMenuItemSelect[] = [];
  cartEntries.forEach(([key, value]) => {
    let data: IMenuItemSelect = itemsRecord[parseInt(key)];
    value.forEach((customizationIds) => {
      data.customizations = customizationIds.map(
        (cId) => customizationRecord[cId]
      );
      cartArray.push({
        ...data,
        customizations: customizationIds.map((cId) => customizationRecord[cId]),
      });
    });
  });

  return cartArray;
}
