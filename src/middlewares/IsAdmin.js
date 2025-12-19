import prisma from "../config/prismaClient.js";

// Middleware para validar usuário ADMIN
export const isAdminMiddleware = async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
  });

  // Verifica se o usuário existe e é admin
  if (!user || user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Acesso negado",
    });
  }

  next();
};
