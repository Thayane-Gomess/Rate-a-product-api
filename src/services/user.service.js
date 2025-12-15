import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prismaClient.js";

class UserService {
  // Registro
  async register({ name, email, password }) {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) throw new Error("E-mail já cadastrado.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };
  }

  // Login
  async login({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("E-mail ou senha inválidos.");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("E-mail ou senha inválidos.");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token
    };
  }

  // Profile
  async profile(userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("Usuário não encontrado.");

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };
  }
}

export default new UserService();