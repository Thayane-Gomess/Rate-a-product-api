const ReviewService = require("../services/review.service.js");

module.exports = {
  // Criar uma nova avaliação
  async createReview(req, res) {
    try {
      const userId = req.userId;

      const reviewData = {
        ...req.body,
        userId: parseInt(userId),
      };

      const review = await ReviewService.create(reviewData);

      return res.status(201).json({
        message: "Avaliação criada com sucesso!",
        review,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  // Listar avaliações de um produto específico
  async listProductReviews(req, res) {
    try {
      const { produtoId } = req.params;
      const reviews = await ReviewService.listByProduct(parseInt(produtoId));

      return res.json({
        message: "Avaliações do produto",
        reviews,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Listar minhas avaliações
  async listMyReviews(req, res) {
    try {
      const userId = req.userId;
      const reviews = await ReviewService.listMyReviews(parseInt(userId));

      return res.json({
        message: "Minhas avaliações",
        reviews,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Atualizar minha avaliação
  async updateReview(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userId;

      const updatedReview = await ReviewService.update(
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
  },

  // Deletar minha avaliação
  async deleteReview(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userId;

      await ReviewService.delete(parseInt(id), parseInt(userId));

      return res.status(200).json({
        message: "Avaliação deletada com sucesso!",
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  // Obter estatísticas de um produto
  async getProductStats(req, res) {
    try {
      const { produtoId } = req.params;
      const stats = await ReviewService.getProductStats(parseInt(produtoId));

      return res.json({
        message: "Estatísticas do produto",
        stats,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};