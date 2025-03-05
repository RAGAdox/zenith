"use server";

import { revalidatePath } from "next/cache";

const revalidatePathAction = (paths?: string[]) => {
  paths?.forEach((path) => revalidatePath(path));
};

export { revalidatePathAction };
