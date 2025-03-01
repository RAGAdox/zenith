--CREATE TABLE
CREATE TABLE
  IF NOT EXISTS "public"."cart" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    "table_id" TEXT NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "customizations" INTEGER[] NOT NULL
  );

-- ENABLE RLS
ALTER TABLE "public"."cart" ENABLE ROW LEVEL SECURITY;

-- READ POLICY
CREATE POLICY "cart:authorized:read" ON "public"."cart" FOR SELECT TO "authenticated" USING (
  EXISTS (
    SELECT 1 FROM "public"."table_reservations" tr WHERE tr."table_id" = "public"."cart"."table_id" AND tr."user_id" = (select auth.uid())
  )
);

-- INSERT POLICY
CREATE POLICY "cart:authorized:write" ON "public"."cart"
FOR INSERT TO "authenticated"
WITH
  CHECK (
    EXISTS (
      SELECT 1 FROM "public"."table_reservations" tr WHERE tr."table_id" = "public"."cart"."table_id" AND tr."user_id" = (select auth.uid())
    )
  );

