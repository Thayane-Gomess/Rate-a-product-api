import { Router } from "express";
import { registerController } from "../controllers/user.controller.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { registerSchema } from "../validations/user.schemas.js";

const router = Router();

// rota de registro
router.post("/register", validateSchema(registerSchema), registerController);

export default router;
