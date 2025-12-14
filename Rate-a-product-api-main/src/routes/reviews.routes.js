import { Router } from "express";
import {
  createReview,
  listProductReviews,
  listMyReviews,
  updateReview,
  deleteReview,
  getProductStats,
} from "../controllers/review.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { reviewSchema } from "../validations/review.schemas.js";

const router = Router();

// ROTAS PÚBLICAS
// Listar avaliações de um produto específico
router.get("/product/:produtoId", listProductReviews);

// Obter estatísticas de um produto
router.get("/product/:produtoId/stats", getProductStats);

// ROTAS PROTEGIDAS (precisa estar logado)
// Criar nova avaliação
router.post(
  "/",
  authMiddleware,
  validateSchema(reviewSchema),
  createReview
);

// Listar minhas avaliações
router.get("/my-reviews", authMiddleware, listMyReviews);

// Atualizar minha avaliação
router.put(
  "/:id",
  authMiddleware,
  validateSchema(reviewSchema),
  updateReview
);

// Deletar minha avaliação
router.delete("/:id", authMiddleware, deleteReview);

export default router;