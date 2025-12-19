import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

// Em ambiente serverless (Vercel), NÃO usamos app.listen
// Apenas exportamos o app para o handler do Vercel
export default app;
