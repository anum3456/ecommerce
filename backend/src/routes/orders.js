import express from 'express';
import Order from '../models/Order.js';
import CartItem from '../models/Cart.js';

const router = express.Router();

// GET /api/orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const { items, customer, total } = req.body;
    if (!items?.length) return res.status(400).json({ error: 'No items in order' });
    const order = new Order({ items, customer, total });
    await order.save();
    // Clear cart after order
    await CartItem.deleteMany({});
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
