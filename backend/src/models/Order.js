import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    image: String,
    quantity: Number,
  }],
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
  },
  total: { type: Number, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'processing', 'shipped', 'delivered'] },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
