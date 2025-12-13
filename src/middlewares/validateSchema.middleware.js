export const validateSchema = (schema) => {
    // Middleware genérico usado para validar dados de entrada (ex: registro e login)
    return (req, res, next) => {
        try {
            // Valida o corpo da requisição conforme o schema recebido
            // No registro: valida nome, email e senha
            // No login: valida email e senha
            schema.parse(req.body);

            // Se a validação passar, segue para o controller
            next();
        } catch (error) {
            // Se a validação falhar, interrompe o fluxo e retorna erro 400
            return res.status(400).json({
                message: "Erro de validação",
                errors: error.errors,
            });
        }
    };
};
