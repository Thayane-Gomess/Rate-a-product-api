import prisma from "../config/prismaClient.js";

export const isAdminMiddleware = async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
  });

  if (!user || user.role !== "ADMIN") {
    return res.status(403).json({ error: "Acesso negado" });
  }

  next();
};
