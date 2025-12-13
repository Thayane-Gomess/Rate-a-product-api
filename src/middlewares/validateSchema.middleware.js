import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token de autenticação não fornecido." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // guarda o id do usuário para usar no controller
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token de autenticação inválido ou expirado." });
  }
};