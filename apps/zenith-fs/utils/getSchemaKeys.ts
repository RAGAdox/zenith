import { z } from "zod";

export default function getSchemaKeys<T extends z.ZodTypeAny>(
  schema: z.ZodObject<any>
): (keyof z.infer<T>)[] {
  return Object.keys(schema.shape) as (keyof z.infer<T>)[];
}
