import jwt from "jsonwebtoken";

// Middleware de autenticação via JWT
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Verifica se o token foi enviado
    if (!authHeader) {
        return res.status(401).json({
            message: "Token de autenticação não fornecido",
        });
    }

    // Extrai o token do header Bearer
    const [, token] = authHeader.split(" ");

    try {
        // Valida o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Salva o id do usuário autenticado
        req.userId = decoded.id;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token inválido ou expirado",
        });
    }
};
