import { z } from "zod";

// Schema de REGISTRO
// Valida os dados necessários para criar um novo usuário
export const registerSchema = z.object({
    // Nome obrigatório com no mínimo 2 caracteres
    name: z.string().min(2, "Nome obrigatório"),

    // Email deve ter formato válido
    email: z.string().email("Email inválido"),

    // Senha deve ter no mínimo 6 caracteres
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

// Schema de LOGIN
// Valida apenas as credenciais do usuário
export const loginSchema = z.object({
    // Email informado no login
    email: z.string().email("Email inválido"),

    // Senha informada no login
    password: z.string().min(6, "Senha obrigatória"),
});
