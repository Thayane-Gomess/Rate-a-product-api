import jwt from "jsonwebtoken";
// Middleware responsável por validar o corpo da requisição usando um schema Zod
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token de autenticação não fornecido." });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
    // se a validação falhar, retorna erro 400 com detalhes
    if (!parsed.success) {
        return res.status(400).json({
            message: "Erro de validação",
            errors: parsed.error.issues
        });
    }

    // se passou, substitui o body pelos dados validados/limpos
    req.body = parsed.data;

    // continua para o próximo middleware ou controller
    next();
};

export default validateSchema;
