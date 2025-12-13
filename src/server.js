import app from "./app.js";
import sequelize from "./config/database.js";

// Importa os models para sincronizar com o banco
import "./models/user.js";
import "./models/product.js";
import "./models/review.js";

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log("Banco conectado e sincronizado!");
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});