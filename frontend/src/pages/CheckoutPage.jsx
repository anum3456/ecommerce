import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api/axios';

const initialForm = { name: '', email: '', address: '', city: '', zip: '' };

export default function CheckoutPage() {
  const { cartItems, cartTotal, emptyCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const shipping = cartTotal >= 100 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const orderTotal = cartTotal + shipping + tax;

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required';
    if (!form.address.trim()) errs.address = 'Address is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.zip.trim()) errs.zip = 'ZIP code is required';
    return errs;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    if (!cartItems.length) return;

    setSubmitting(true);
    try {
      const { data: order } = await createOrder({
        items: cartItems.map(i => ({
          productId: i.productId,
          name: i.name,
          price: i.price,
          image: i.image,
          quantity: i.quantity,
        })),
        customer: form,
        total: orderTotal,
      });
      await emptyCart();
      navigate(`/order-confirmation/${order._id}`);
    } catch (err) {
      alert('Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const Field = ({ label, name, type = 'text', placeholder, half }) => (
    <div style={{ gridColumn: half ? 'span 1' : 'span 2' }}>
      <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--charcoal)', marginBottom: '0.4rem' }}>{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.7rem 0.9rem',
          border: `1.5px solid ${errors[name] ? '#ef4444' : 'var(--border)'}`,
          outline: 'none',
          fontSize: '0.9rem',
          background: 'var(--surface)',
          color: 'var(--charcoal)',
          transition: 'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--charcoal)'}
        onBlur={e => e.target.style.borderColor = errors[name] ? '#ef4444' : 'var(--border)'}
      />
      {errors[name] && <p style={{ fontSize: '0.75rem', color: '#ef4444', margin: '0.3rem 0 0' }}>{errors[name]}</p>}
    </div>
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.2rem', fontWeight: 700, margin: '0 0 2rem', letterSpacing: '-0.02em' }}>Checkout</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '3rem', alignItems: 'start' }}>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '2rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, margin: '0 0 1.5rem', color: 'var(--charcoal)' }}>
              Contact & Shipping
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Field label="Full Name" name="name" placeholder="Jane Smith" />
              <Field label="Email Address" name="email" type="email" placeholder="jane@example.com" />
              <Field label="Street Address" name="address" placeholder="123 Main Street, Apt 4B" />
              <Field label="City" name="city" placeholder="New York" half />
              <Field label="ZIP / Postal Code" name="zip" placeholder="10001" half />
            </div>
          </div>

          {/* Payment note */}
          <div style={{ background: 'rgba(193,127,62,0.06)', border: '1px solid rgba(193,127,62,0.2)', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.1rem' }}>ℹ️</span>
            <p style={{ fontSize: '0.82rem', color: 'var(--warm-gray)', margin: 0, lineHeight: 1.6 }}>
              This is a demo store. No payment is required. Click <strong>Place Order</strong> to simulate a completed purchase.
            </p>
          </div>

          <button type="submit" disabled={submitting} className="btn-primary" style={{ width: '100%', opacity: submitting ? 0.7 : 1, fontSize: '0.9rem', padding: '1rem' }}>
            {submitting ? 'Placing Order...' : `Place Order — $${orderTotal.toFixed(2)}`}
          </button>
        </form>

        {/* Summary */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '2rem', position: 'sticky', top: '100px' }}>
          <h2 style={{ fontSize: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, margin: '0 0 1.5rem' }}>Order Items</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {cartItems.map(item => (
              <div key={item._id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{ width: '52px', height: '52px', flexShrink: 0, background: '#f0ebe3', overflow: 'hidden' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 500 }}>{item.name}</p>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--warm-gray)' }}>Qty: {item.quantity}</p>
                </div>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--warm-gray)' }}>
              <span>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--warm-gray)' }}>
              <span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--warm-gray)' }}>
              <span>Tax</span><span>${tax.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)', fontFamily: 'Playfair Display, serif' }}>
              <span>Total</span><span>${orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
