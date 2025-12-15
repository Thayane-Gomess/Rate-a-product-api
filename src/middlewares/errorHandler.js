// Middleware centralizado de tratamento de erros
export const errorHandler = (err, req, res, next) => {
  console.error(err); // log no servidor

  // Se já tiver um status definido, usa ele. Senão, 500.
  const status = err.status || 500;

  res.status(status).json({
    message: err.message || "Erro interno no servidor",
    // se quiser, pode incluir detalhes extras em ambiente de dev
    errors: err.errors || null,
  });
};

