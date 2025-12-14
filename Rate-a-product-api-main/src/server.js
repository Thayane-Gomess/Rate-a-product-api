<<<<<<< HEAD
/* eslint-disable */
require("dotenv").config();
const app = require("./app");
const sequelize = require("./database");

require("./models/Product");

const PORT = process.env.PORT || 3000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Banco sincronizado");
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar no banco:", err);
  });
=======
import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
>>>>>>> b326ce3e7ca3250bc60f6568ae93910947983c93
