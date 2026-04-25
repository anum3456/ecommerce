import express from 'express';
import CartItem from '../models/Cart.js';

const router = express.Router();

// GET /api/cart
router.get('/', async (req, res) => {
  try {
    const items = await CartItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/cart
router.post('/', async (req, res) => {
  try {
    const { productId, name, price, image, quantity = 1 } = req.body;
    // Check if item already in cart
    let existing = await CartItem.findOne({ productId });
    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      return res.json(existing);
    }
    const item = new CartItem({ productId, name, price, image, quantity });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/cart/:id
router.patch('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await CartItem.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
    if (!item) return res.status(404).json({ error: 'Cart item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/cart/:id
router.delete('/:id', async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/cart (clear cart)
router.delete('/', async (req, res) => {
  try {
    await CartItem.deleteMany({});
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
