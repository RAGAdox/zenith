import { defineConfig } from "drizzle-kit";

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) {
  throw new Error("DATABASE_URL is missing in environment variables");
}

export default defineConfig({
  casing: "snake_case",
  strict: true,
  out: ".drizzle",
  verbose: true,
  dbCredentials: {
    url: DB_URL,
  },
  dialect: "postgresql", // 'mysql' | 'sqlite' | 'turso'
  schema: "./src/schema",
});
