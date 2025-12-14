const Product = require("../models/Product");

module.exports = {
  async create(req, res) {
    try {
      const { name, description, price } = req.body;

      const product = await Product.create({
        name,
        description,
        price,
      });

      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar produto" });
    }
  },

  async list(req, res) {
    try {
      const products = await Product.findAll();
      return res.json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar produtos" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price } = req.body;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      await product.update({ name, description, price });
      return res.json(product);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar produto" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      await product.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar produto" });
    }
  },
};
