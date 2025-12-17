import reviewService from "../services/reviews.service.js";

// Criar uma nova avaliação
export const createReview = async (req, res) => {
  try {
    const userId = req.userId;

    const reviewData = {
      ...req.body,
      userId: parseInt(userId),
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

// Listar avaliações de um produto específico
export const listProductReviews = async (req, res) => {
  try {
    const { produtoId } = req.params;
    const reviews = await reviewService.listByProduct(parseInt(produtoId));

    return res.json({
      message: "Avaliações do produto",
      reviews,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Listar minhas avaliações
export const listMyReviews = async (req, res) => {
  try {
    const userId = req.userId;
    const reviews = await reviewService.listMyReviews(parseInt(userId));

    return res.json({
      message: "Minhas avaliações",
      reviews,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Atualizar minha avaliação
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const updatedReview = await reviewService.update(
      parseInt(id),
      parseInt(userId),
      req.body
    );

    return res.json({
      message: "Avaliação atualizada com sucesso!",
      review: updatedReview,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Deletar minha avaliação
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    await reviewService.delete(parseInt(id), parseInt(userId));

    return res.status(200).json({
      message: "Avaliação deletada com sucesso!",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Obter estatísticas de um produto
export const getProductStats = async (req, res) => {
  try {
    const { produtoId } = req.params;
    const stats = await reviewService.getProductStats(parseInt(produtoId));

    return res.json({
      message: "Estatísticas do produto",
      stats,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};