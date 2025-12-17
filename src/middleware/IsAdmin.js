export const isAdminMiddleware = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Acesso negado" });
  }

  next();
};