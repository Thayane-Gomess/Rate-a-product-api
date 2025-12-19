import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Nome do produto é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  price: z.number().positive("Preço deve ser maior que zero"),
});
