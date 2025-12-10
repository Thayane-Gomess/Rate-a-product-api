// Middleware responsável por validar o corpo da requisição usando um schema Zod
const validateSchema = (schema) => (req, res, next) => {
    // tenta validar os dados enviados no body
    const parsed = schema.safeParse(req.body);

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
