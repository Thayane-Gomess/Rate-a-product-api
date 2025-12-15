import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/products.routers.js";
import reviewRoutes from "./routes/reviews.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import swagger from "./docs/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/reviews", reviewRoutes);

// Swagger (documentação da API)
swagger(app);

// Middleware de erro (sempre por último)
app.use(errorHandler);

export default app;