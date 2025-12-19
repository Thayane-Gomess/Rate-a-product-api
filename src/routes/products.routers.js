import express from "express";
import productController from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { isAdminMiddleware } from "../middlewares/IsAdmin.js";



const router = express.Router();

// Público
router.get("/", productController.list);

// Apenas ADMIN
router.post("/", authMiddleware, isAdminMiddleware, productController.create);
router.put("/:id", authMiddleware, isAdminMiddleware, productController.update);
router.delete("/:id", authMiddleware, isAdminMiddleware, productController.delete);

export default router;