const prisma = require('../../../common/prisma/client');
const { z } = require('zod');

const orderSchema = z.object({
  userId: z.number().int().positive(),
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
  total: z.number().positive()
});

const createOrder = async (req, res) => {
  const orderData = orderSchema.safeParse(req.body);
  if (!orderData.success) {
    return res.status(400).json({ error: 'Invalid order data' });
  }

  const { userId, productId, quantity, total } = orderData.data;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ error: 'Not enough quantity available' });
    }

    const newOrder = await prisma.$transaction(async (tx) => {
      const updatedProduct = await tx.product.update({
        where: { id: productId },
        data: { quantity: product.quantity - quantity },
      });

      if (updatedProduct.quantity < 0) {
        throw new Error('Not enough quantity available');
      }

      const createdOrder = await tx.order.create({
        data: { userId, productId, quantity, total },
      });

      return createdOrder;
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createOrder, getOrders };
