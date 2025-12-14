import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import reviewRoutes from "./routes/review.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/reviews", reviewRoutes); 

export default app;