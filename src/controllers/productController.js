import prisma from "../config/prismaClient.js";

const productController = {
  async create(req, res) {
    try {
      const { name, description, price } = req.body;

      const product = await prisma.produto.create({
        data: { nome: name, descricao: description, preco: price },
      });

      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar produto" });
    }
  },

  async list(req, res) {
    try {
      // Pegando page e limit da query string
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      // Busca paginada
      const products = await prisma.produto.findMany({
        where: { deletedAt: null },
        skip,
        take: limit,
      });

      // Conta total de produtos ativos
      const total = await prisma.produto.count({
        where: { deletedAt: null },
      });

      return res.json({
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

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price } = req.body;

      const product = await prisma.produto.findUnique({
        where: { id: parseInt(id) },
      });

      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      const updated = await prisma.produto.update({
        where: { id: parseInt(id) },
        data: { nome: name, descricao: description, preco: price },
      });

      return res.json(updated);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar produto" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const product = await prisma.produto.findUnique({
        where: { id: parseInt(id) },
      });

      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      // Soft delete em vez de destroy
      await prisma.produto.update({
        where: { id: parseInt(id) },
        data: { deletedAt: new Date() },
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar produto" });
    }
  },
};

export default productController;