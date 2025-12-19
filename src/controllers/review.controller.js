import reviewService from "../services/reviews.service.js";

// Cria uma nova avaliação (usuário autenticado)
export const createReview = async (req, res) => {
  try {
    const userId = Number(req.userId);

    const reviewData = {
      ...req.body,
      userId,
    };

    const review = await reviewService.create(reviewData);

    return res.status(201).json({
      message: "Avaliação criada com sucesso!",
      review,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Lista avaliações de um produto específico (público)
export const listProductReviews = async (req, res) => {
  try {
    const produtoId = Number(req.params.produtoId);

    const reviews = await reviewService.listByProduct(produtoId);

    return res.status(200).json({
      message: "Avaliações do produto",
      reviews,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Lista avaliações do usuário logado
export const listMyReviews = async (req, res) => {
  try {
    const userId = Number(req.userId);

    const reviews = await reviewService.listMyReviews(userId);

    return res.status(200).json({
      message: "Minhas avaliações",
      reviews,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Atualiza uma avaliação do próprio usuário
export const updateReview = async (req, res) => {
  try {
    const reviewId = Number(req.params.id);
    const userId = Number(req.userId);

    const updatedReview = await reviewService.update(
      reviewId,
      userId,
      req.body
    );

    return res.status(200).json({
      message: "Avaliação atualizada com sucesso!",
      review: updatedReview,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Remove uma avaliação do próprio usuário (soft delete)
export const deleteReview = async (req, res) => {
  try {
    const reviewId = Number(req.params.id);
    const userId = Number(req.userId);

    await reviewService.delete(reviewId, userId);

    return res.status(200).json({
      message: "Avaliação deletada com sucesso!",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Retorna estatísticas de avaliações de um produto (público)
export const getProductStats = async (req, res) => {
  try {
    const produtoId = Number(req.params.produtoId);

    const stats = await reviewService.getProductStats(produtoId);

    return res.status(200).json({
      message: "Estatísticas do produto",
      stats,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
