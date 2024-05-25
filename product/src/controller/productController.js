const prisma = require('../../../prisma/client');
const { z } = require('zod');

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().positive()
});

const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = productSchema.parse(req.body);
    const newProduct = await prisma.product.create({
      data: { name, description, price, quantity }
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity } = productSchema.parse(req.body);
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id, 10) },
      data: { name, description, price, quantity }
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: parseInt(id, 10) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
