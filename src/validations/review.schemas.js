import { z } from "zod";

// Schema para criar/atualizar uma avaliação
export const reviewSchema = z.object({
  // Nota deve ser inteiro entre 1 e 5
  nota: z
    .number()
    .int()
    .min(1, "A nota mínima é 1")
    .max(5, "A nota máxima é 5"),

  // Comentário obrigatório com no mínimo 10 caracteres
  comentario: z
    .string()
    .min(10, "O comentário deve ter no mínimo 10 caracteres")
    .max(500, "O comentário deve ter no máximo 500 caracteres"),

  // Produto ID deve ser número positivo
  produtoId: z
    .number()
    .int()
    .positive("ID do produto inválido"),
});

// Schema específico para UPDATE de avaliação
// Permite atualizar apenas a nota ou apenas o comentário
export const updateReviewSchema = z.object({
  nota: z
    .number()
    .int()
    .min(1, "A nota mínima é 1")
    .max(5, "A nota máxima é 5")
    .optional(),

  comentario: z
    .string()
    .min(10, "O comentário deve ter no mínimo 10 caracteres")
    .max(500, "O comentário deve ter no máximo 500 caracteres")
    .optional(),
});