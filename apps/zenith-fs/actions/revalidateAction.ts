"use server";

import { revalidatePath } from "next/cache";

const revalidatePathAction = (path?: string) => {
  revalidatePath(path ?? "/");
};

export { revalidatePathAction };
