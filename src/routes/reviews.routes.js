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
import {
  reviewSchema,
  updateReviewSchema,
} from "../validations/review.schemas.js";

const router = Router();

// --- ROTAS PÚBLICAS ---

// Listar avaliações de um produto específico
router.get("/product/:produtoId", listProductReviews);

// Estatísticas (média, total) de um produto
router.get("/product/:produtoId/stats", getProductStats);


// --- ROTAS PROTEGIDAS (Requer Login) ---

// IMPORTANTE: Rotas fixas (como /my-reviews) devem vir antes de rotas com /:id
router.get("/my-reviews", authMiddleware, listMyReviews);

// Criar avaliação (O schema já valida se produtoId está no body)
router.post(
  "/",
  authMiddleware,
  validateSchema(reviewSchema),
  createReview
);

// Atualizar avaliação (Apenas a própria avaliação)
router.put(
  "/:id",
  authMiddleware,
  validateSchema(updateReviewSchema),
  updateReview
);

// Deletar avaliação (Soft delete)
router.delete("/:id", authMiddleware, deleteReview);

export default router;