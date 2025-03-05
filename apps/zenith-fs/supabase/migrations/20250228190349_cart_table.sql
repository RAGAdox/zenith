--CREATE TABLE
CREATE TABLE
  IF NOT EXISTS "public"."cart" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    "table_id" TEXT NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "customizations" INTEGER[] NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT now() NOT NULL

  );

-- DATA RETRIVAL FUNCTION

CREATE OR REPLACE FUNCTION get_cart_data(p_table_id TEXT)
RETURNS TABLE(id numeric, customizationIds JSONB)
LANGUAGE SQL
SECURITY DEFINER
SET search_path = ''
AS $$
SELECT menu_id, jsonb_agg(customizations)
FROM public.cart
WHERE table_id = p_table_id
GROUP BY menu_id;
$$;

CREATE OR REPLACE FUNCTION get_cart_items(p_table_id TEXT)
RETURNS TABLE (_id UUID,id numeric,name TEXT,description TEXT,price NUMERIC(10,2),image_url TEXT,customizations JSONB[])
LANGUAGE SQL
SECURITY DEFINER
SET search_path=''
AS $$
SELECT 
  c.id,
  c.menu_id,
  m.name,
  m.description,
  m.price,
  m.image_url,
  CASE
    WHEN array_length(c.customizations,1)=0 THEN NULL
    ELSE
      array_agg(jsonb_build_object('id',ic.id,'name',ic.name,'additional_price',ic.additional_price)) FILTER (WHERE ic.id IS NOT NULL)
    END
  AS item_customizations
FROM public.cart c
JOIN public.menu m ON c.menu_id=m.id
LEFT JOIN public.item_customization ic ON ic.id=ANY(c.customizations)
WHERE c.table_id=p_table_id
GROUP BY c.id, c.table_id, c.menu_id, m.name, m.description, m.price, m.image_url;
$$;

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

-- DELETE POLICY
CREATE POLICY "cart:authorized:delete" ON "public"."cart"
FOR DELETE TO "authenticated"
USING (
    EXISTS (
      SELECT 1 FROM "public"."table_reservations" tr WHERE tr."table_id" = "public"."cart"."table_id" AND tr."user_id" = (select auth.uid())
    )
  );

-- ENABLE REALTIME
ALTER publication supabase_realtime ADD TABLE public."cart";


