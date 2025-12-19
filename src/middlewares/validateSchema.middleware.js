// Middleware genérico de validação com Zod
export const validateSchema = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            return res.status(400).json({
                message: "Erro de validação",
                errors: error.errors,
            });
        }
    };
};
