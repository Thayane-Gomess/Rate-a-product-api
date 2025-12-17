import { defineConfig } from "@prisma/client";

export default defineConfig({
  datasource: {
    db: {
      provider: "sqlite",
      url: process.env.DATABASE_URL ?? "file:./dev.db",
    },
  },
});