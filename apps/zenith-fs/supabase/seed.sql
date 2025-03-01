-- MENU ITEMS
INSERT INTO
  "public"."menu" ("id", "name", "description", "price", "image_url") OVERRIDING SYSTEM VALUE
VALUES
  (
    4,
    'Masala Dosa',
    'A crispy South Indian dosa filled with spicy potato masala',
    80.00,
    'masala_dosa.jpg'
  ),
  (
    5,
    'Paneer Butter Masala',
    'Creamy tomato-based curry with paneer cubes',
    180.00,
    'paneer_butter_masala.jpg'
  ),
  (
    6,
    'Chole Bhature',
    'Spicy chickpea curry served with deep-fried fluffy bread',
    120.00,
    'chole_bhature.jpg'
  ),
  (
    7,
    'Biryani',
    'Fragrant basmati rice cooked with aromatic spices and vegetables',
    200.00,
    'biryani.jpg'
  ),
  (
    8,
    'Vada Pav',
    'Mumbai-style spicy potato fritter in a bun with chutney',
    30.00,
    'vada_pav.jpg'
  );

-- MENU ITEM CUSTOMIZATION
INSERT INTO
  "public"."item_customization" ("id", "name", "additional_price", "menu_item_id") OVERRIDING SYSTEM VALUE
VALUES
  (1, 'Extra Coconut Chutney', 10.00, 4),
  (2, 'Extra Sambar', 15.00, 4),
  (3, 'Extra Potato Filling', 20.00, 4),
  (4, 'Extra Butter', 20.00, 5),
  (5, 'Extra Paneer', 40.00, 5),
  (6, 'Spicy Gravy', 10.00, 5),
  (7, 'Extra Chole', 25.00, 6),
  (8, 'Extra Bhature', 30.00, 6),
  (9, 'Less Oil', 0.00, 6),
  (10, 'Extra Raita', 15.00, 7),
  (11, 'Double Masala', 20.00, 7),
  (12, 'Extra Fried Onions', 10.00, 7),
  (13, 'Extra Spicy Chutney', 5.00, 8),
  (14, 'Extra Cheese', 15.00, 8),
  (15, 'Double Patty', 20.00, 8);