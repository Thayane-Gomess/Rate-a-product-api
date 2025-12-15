import { Router } from "express";
import { registerController, loginController } from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { registerSchema, loginSchema } from "../validations/user.schemas.js";

const router = Router();

// Rota de REGISTRO
// 1. Valida os dados (nome, email e senha)
// 2. Cria um novo usuário no banco
router.post(
    "/register",
    validateSchema(registerSchema),
    registerController
);

// Rota de LOGIN
// 1. Valida email e senha
// 2. Autentica o usuário
// 3. Retorna um token JWT
router.post(
    "/login",
    validateSchema(loginSchema),
    loginController
);

// Rota PROTEGIDA
// Só pode ser acessada com token JWT válido
router.get(
    "/profile",
    authMiddleware,
    (req, res) => {
        return res.json({
            message: "Rota protegida",
            userId: req.userId,
        });
    }
);

export default router;
