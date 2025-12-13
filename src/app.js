<<<<<<< HEAD
const express = require('express');
const app = express();

app.use(express.json());

const productRoutes = require('./routes/products');
app.use('/products', productRoutes);

module.exports = app;
=======
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas de usuário com prefixo
app.use('/users', userRoutes);

export default app;
>>>>>>> b326ce3e7ca3250bc60f6568ae93910947983c93
