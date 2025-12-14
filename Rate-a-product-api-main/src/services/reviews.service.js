import prisma from "../config/prismaClient.js";

class ReviewService {
  // Criar uma avaliação
  async create({ nota, comentario, produtoId, userId }) {
    // Verificar se a nota está entre 1 e 5
    if (nota < 1 || nota > 5) {
      throw new Error("A nota deve ser entre 1 e 5.");
    }

    // Verificar se o produto existe
    const produto = await prisma.produto.findUnique({
      where: { id: produtoId },
    });

    if (!produto) {
      throw new Error("Produto não encontrado.");
    }

    // Verificar se o usuário já avaliou este produto
    const avaliacaoExistente = await prisma.avaliacao.findFirst({
      where: {
        produtoId,
        userId,
      },
    });

    if (avaliacaoExistente) {
      throw new Error("Você já avaliou este produto.");
    }

    // Criar a avaliação
    return await prisma.avaliacao.create({
      data: {
        nota,
        comentario,
        produtoId,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  // Listar avaliações de um produto
  async listByProduct(produtoId) {
    return await prisma.avaliacao.findMany({
      where: {
        produtoId,
        deletedAt: null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // Listar minhas avaliações
  async listMyReviews(userId) {
    return await prisma.avaliacao.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      include: {
        produto: {
          select: {
            id: true,
            nome: true,
            descricao: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // Atualizar minha avaliação
  async update(id, userId, { nota, comentario }) {
    // Verificar se a avaliação existe e pertence ao usuário
    const avaliacao = await prisma.avaliacao.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });

    if (!avaliacao) {
      throw new Error("Avaliação não encontrada ou não pertence a você.");
    }

    if (nota < 1 || nota > 5) {
      throw new Error("A nota deve ser entre 1 e 5.");
    }

    return await prisma.avaliacao.update({
      where: { id },
      data: { nota, comentario },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  // Deletar minha avaliação (soft delete)
  async delete(id, userId) {
    // Verificar se a avaliação existe e pertence ao usuário
    const avaliacao = await prisma.avaliacao.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });

    if (!avaliacao) {
      throw new Error("Avaliação não encontrada ou não pertence a você.");
    }

    // Soft delete (não remove do banco, apenas marca como deletado)
    return await prisma.avaliacao.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  // Obter estatísticas de um produto
  async getProductStats(produtoId) {
    const reviews = await prisma.avaliacao.findMany({
      where: {
        produtoId,
        deletedAt: null,
      },
    });

    if (reviews.length === 0) {
      return {
        average: 0,
        total: 0,
        distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      };
    }

    const total = reviews.length;
    const sum = reviews.reduce((acc, review) => acc + review.nota, 0);
    const average = sum / total;

    // Contar quantas de cada nota
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((review) => {
      distribution[review.nota]++;
    });

    return {
      average: parseFloat(average.toFixed(1)),
      total,
      distribution,
    };
  }
}

export default new ReviewService();