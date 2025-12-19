import express from "express";
import productController from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { isAdminMiddleware } from "../middlewares/IsAdmin.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { productSchema } from "../validations/product.schemas.js";

const router = express.Router();

/**
 * ROTAS PÚBLICAS
 */
router.get("/", productController.list);

/**
 * ROTAS PRIVADAS (Apenas ADMIN)
 * * Ordem dos Middlewares:
 * 1. authMiddleware: Verifica se o token JWT é válido e extrai o userId.
 * 2. isAdminMiddleware: Verifica no banco se esse userId tem role "ADMIN".
 * 3. validateSchema: Garante que o corpo da requisição está correto antes de chegar no banco.
 */

router.post(
    "/",
    authMiddleware,
    isAdminMiddleware,
    validateSchema(productSchema),
    productController.create
);

router.put(
    "/:id",
    authMiddleware,
    isAdminMiddleware,
    validateSchema(productSchema),
    productController.update
);

router.delete(
    "/:id",
    authMiddleware,
    isAdminMiddleware,
    productController.delete
);

export default router;