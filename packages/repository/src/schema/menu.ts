import { relations, sql } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const menuItems = pgTable("menu", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar({ length: 100 }).notNull(),
  description: t.text(),
  price: t.decimal({ scale: 2 }).notNull().default("0.00"),
  imageUrl: t.text(),
});

export const itemCustomizations = pgTable(
  "item_customization",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    menuItemId: t
      .integer("menu_item_id")
      .notNull()
      .references(() => menuItems.id),
    name: t.varchar({ length: 100 }).notNull(),
    isDefault: t.boolean("is_default").default(false),
    additionalPrice: t
      .decimal("additional_price", { scale: 2 })
      .notNull()
      .default("0.00"),
  },
  (table) => [
    t.check(
      "price_check",
      sql`NOT (${table.isDefault} AND ${table.additionalPrice}<>0.00)`
    ),
  ]
);

export const menuRelations = relations(menuItems, ({ many }) => ({
  customizations: many(itemCustomizations),
}));

export const customizationsRelation = relations(
  itemCustomizations,
  ({ one }) => ({
    menuItems: one(menuItems, {
      fields: [itemCustomizations.menuItemId],
      references: [menuItems.id],
    }),
  })
);
