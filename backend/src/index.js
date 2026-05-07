import express from 'express';
import cors from 'cors';
import { randomUUID } from 'crypto';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ── In-memory stores ──────────────────────────────────────────
let products = [
  { _id: '1', name: 'Arc Desk Lamp', description: 'Minimalist arc floor lamp with adjustable brightness and a matte black finish. Perfect for reading nooks and modern living spaces.', price: 89.99, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80', category: 'Home', stock: 15, rating: 4.7, reviews: 128 },
  { _id: '2', name: 'Ceramic Pour-Over Set', description: 'Handcrafted ceramic pour-over coffee dripper with matching mug. Brews a clean, rich cup with no bitterness.', price: 54.00, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80', category: 'Kitchen', stock: 30, rating: 4.9, reviews: 84 },
  { _id: '3', name: 'Merino Wool Throw', description: 'Ultra-soft 100% merino wool throw blanket. Naturally temperature-regulating, perfect for year-round comfort.', price: 120.00, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', category: 'Home', stock: 20, rating: 4.8, reviews: 212 },
  { _id: '4', name: 'Mechanical Keyboard', description: 'Compact 75% layout mechanical keyboard with custom tactile switches. USB-C connectivity with PBT keycaps.', price: 149.00, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80', category: 'Tech', stock: 12, rating: 4.6, reviews: 305 },
  { _id: '5', name: 'Leather Passport Wallet', description: 'Full-grain Italian leather passport holder with 4 card slots and RFID blocking. Ages beautifully with use.', price: 65.00, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80', category: 'Accessories', stock: 50, rating: 4.5, reviews: 97 },
  { _id: '6', name: 'Wooden Desk Organizer', description: 'Solid walnut desk organizer with compartments for pens, cards, phone, and small accessories. Handmade in small batches.', price: 78.00, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80', category: 'Home', stock: 8, rating: 4.4, reviews: 56 },
  { _id: '7', name: 'Noise-Cancelling Earbuds', description: 'True wireless earbuds with hybrid active noise cancellation, 30h total battery life, and a custom EQ app.', price: 199.00, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80', category: 'Tech', stock: 25, rating: 4.7, reviews: 441 },
  { _id: '8', name: 'Glass Water Bottle', description: 'Borosilicate glass bottle with a silicone sleeve and bamboo lid. 500ml, dishwasher safe, BPA-free.', price: 38.00, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80', category: 'Kitchen', stock: 60, rating: 4.3, reviews: 179 },
  { _id: '9', name: 'Linen Tote Bag', description: 'Heavy-duty stonewashed linen tote with interior zip pocket and reinforced handles. Fits a 13" laptop.', price: 45.00, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80', category: 'Accessories', stock: 35, rating: 4.6, reviews: 73 },
  { _id: '10', name: 'Analog Wall Clock', description: 'Bauhaus-inspired wall clock with a silent sweep mechanism. 30cm diameter, powder-coated steel frame.', price: 95.00, image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=600&q=80', category: 'Home', stock: 18, rating: 4.8, reviews: 144 },
  { _id: '11', name: 'Portable Espresso Maker', description: 'Handheld espresso machine requiring no electricity. 18-bar pressure, compatible with capsules and grounds.', price: 110.00, image: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=600&q=80', category: 'Kitchen', stock: 22, rating: 4.5, reviews: 261 },
  { _id: '12', name: 'Wireless Charging Pad', description: '15W fast wireless charger with a vegan leather surface. Compatible with all Qi-enabled devices.', price: 49.00, image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=600&q=80', category: 'Tech', stock: 40, rating: 4.4, reviews: 388 },
];

let cart = [];
let orders = [];

// ── Products ──────────────────────────────────────────────────
app.get('/api/products', (req, res) => {
  const { category, search } = req.query;
  let result = [...products];
  if (category && category !== 'All') result = result.filter(p => p.category === category);
  if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  res.json(result);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.post('/api/products', (req, res) => {
  const product = { _id: randomUUID(), ...req.body };
  products.push(product);
  res.status(201).json(product);
});

app.delete('/api/products/:id', (req, res) => {
  products = products.filter(p => p._id !== req.params.id);
  res.json({ message: 'Product deleted' });
});

// ── Cart ──────────────────────────────────────────────────────
app.get('/api/cart', (req, res) => res.json(cart));

app.post('/api/cart', (req, res) => {
  const { productId, name, price, image, quantity = 1 } = req.body;
  const existing = cart.find(i => i.productId === productId);
  if (existing) {
    existing.quantity += quantity;
    return res.json(existing);
  }
  const item = { _id: randomUUID(), productId, name, price, image, quantity };
  cart.push(item);
  res.status(201).json(item);
});

app.patch('/api/cart/:id', (req, res) => {
  const item = cart.find(i => i._id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Cart item not found' });
  item.quantity = req.body.quantity;
  res.json(item);
});

app.delete('/api/cart/:id', (req, res) => {
  cart = cart.filter(i => i._id !== req.params.id);
  res.json({ message: 'Item removed' });
});

app.delete('/api/cart', (req, res) => {
  cart = [];
  res.json({ message: 'Cart cleared' });
});

// ── Orders ────────────────────────────────────────────────────
app.get('/api/orders', (req, res) => res.json([...orders].reverse()));

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o._id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

app.post('/api/orders', (req, res) => {
  const { items, customer, total } = req.body;
  if (!items?.length) return res.status(400).json({ error: 'No items in order' });
  const order = {
    _id: randomUUID(),
    items,
    customer,
    total,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  cart = []; // clear cart after order
  res.status(201).json(order);
});

// ── Health ────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
