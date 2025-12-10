import bcrypt from "bcrypt";
import prisma from "../config/prismaClient.js";

class UserService {
    // cria um novo usuário
    async register({ name, email, password }) {
        // verifica se o e-mail já existe
        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists) throw new Error("E-mail já cadastrado.");

        // hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // cria o usuário
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        // retorna sem a senha por segurança
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        };
    }
}

export default new UserService();
