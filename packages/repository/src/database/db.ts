import { drizzle, NeonClient, NeonDatabase } from "drizzle-orm/neon-serverless";
import * as schema from "../schema";

let db: (NeonDatabase<typeof schema> & { $client: NeonClient }) | null = null;

export const getDrizzleDB = () => {
  if (db) {
    return db;
  }
  const DB_URL = process.env.DATABASE_URL;
  if (!DB_URL) {
    throw new Error("DATABASE_URL not set in environment variable");
  }
  db = drizzle(DB_URL, { casing: "snake_case", logger: false, schema });
  return db;
};
