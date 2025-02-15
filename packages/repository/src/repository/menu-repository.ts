import { InferInsertModel, InferSelectModel } from "drizzle-orm";
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
