import { getMenu } from "@/repository/menu";

type MenuItem = NonNullable<Awaited<ReturnType<typeof getMenu>>>[number];
