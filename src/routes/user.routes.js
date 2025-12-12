import { Router } from "express";
import { registerController, loginController, profileController } from "../controllers/user.controller.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { registerSchema, loginSchema } from "../validations/user.schemas.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// rota de registro
router.post("/register", validateSchema(registerSchema), registerController);

// rota de login
router.post("/login", validateSchema(loginSchema), loginController);

// rota de perfil (protegida pelo middleware de autenticação)
router.get("/profile", authMiddleware, profileController);
export default router;
