--CREATE TABLE
CREATE TABLE
  IF NOT EXISTS "public"."table_reservations" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    "user_id" UUID NOT NULL UNIQUE,
    "table_id" TEXT NOT NULL
  );

-- ENABLE RLS
ALTER TABLE "public"."table_reservations" ENABLE ROW LEVEL SECURITY;

-- READ POLICY
CREATE POLICY "table_reservations:authorized:read" ON "public"."table_reservations" FOR
SELECT
  TO "authenticated" USING (
    (
      SELECT
        "auth".uid ()
    ) = "public"."table_reservations"."user_id"
  );

-- INSERT POLICY
CREATE POLICY "table_reservations:authenticated:insert" ON "public"."table_reservations" FOR INSERT TO "authenticated"
WITH
  CHECK (true);