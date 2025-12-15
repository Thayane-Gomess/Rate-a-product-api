import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rate-a-Product API",
      version: "1.0.0",
      description: "API para avaliações de produtos com autenticação",
    },
    servers: [
      {
        url: "http://localhost:3000", // ajuste para o endereço do deploy depois
      },
    ],
  },
  apis: ["./src/routes/*.js"], // busca comentários JSDoc nas rotas
};

const specs = swaggerJsdoc(options);

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};