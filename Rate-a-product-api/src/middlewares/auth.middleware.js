import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    // Lê o header Authorization enviado pelo cliente
    const authHeader = req.headers.authorization;

    // Se não houver token, bloqueia o acesso à rota protegida
    if (!authHeader) {
        return res.status(401).json({
            message: "Token de autenticação não fornecido.",
        });
    }

    // Extrai apenas o token (remove o "Bearer")
    const [, token] = authHeader.split(" ");

    try {
        // Valida o token usando a chave secreta
        // Esse token é gerado no login
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Armazena o id do usuário autenticado na requisição
        // Será usado em controllers de rotas protegidas
        req.userId = decoded.id;

        // Permite o acesso à rota
        next();
    } catch (error) {
        // Se o token for inválido ou estiver expirado, bloqueia o acesso
        return res.status(401).json({
            message: "Token de autenticação inválido ou expirado.",
        });
    }
};
