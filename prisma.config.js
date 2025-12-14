const { defineConfig } = require("@prisma/config");

module.exports = defineConfig({
  datasource: {
    db: {
      adapter: "sqlite",
      url: "file:./database.sqlite", // fixo, sem process.env
    },
  },
});