import prisma from "../config/prismaClient.js";

const productController = {
  // Cria um novo produto (ADMIN)
  async create(req, res) {
    try {
      const { name, description, price } = req.body;

      const product = await prisma.produto.create({
        data: {
          nome: name,
          descricao: description,
          preco: price,
        },
      });

      return res.status(201).json(product);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar produto" });
    }
  },

  // Lista produtos ativos com paginação (público)
  async list(req, res) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const products = await prisma.produto.findMany({
        where: { deletedAt: null },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      });

      const total = await prisma.produto.count({
        where: { deletedAt: null },
      });

      return res.status(200).json({
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: products,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar produtos" });
    }
  },

  // Atualiza um produto existente (ADMIN)
  async update(req, res) {
    try {
      const productId = Number(req.params.id);
      const { name, description, price } = req.body;

      const product = await prisma.produto.findUnique({
        where: { id: productId },
      });

      if (!product || product.deletedAt) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      const updatedProduct = await prisma.produto.update({
        where: { id: productId },
        data: {
          nome: name,
          descricao: description,
          preco: price,
        },
      });

      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar produto" });
    }
  },

  // Remove um produto (soft delete) (ADMIN)
  async delete(req, res) {
    try {
      const productId = Number(req.params.id);

      const product = await prisma.produto.findUnique({
        where: { id: productId },
      });

      if (!product || product.deletedAt) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      await prisma.produto.update({
        where: { id: productId },
        data: { deletedAt: new Date() },
      });

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar produto" });
    }
  },
};

export default productController;
