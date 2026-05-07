import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { cartItems, cartTotal, updateItem, removeItem } = useCart();
  const navigate = useNavigate();

  const shipping = cartTotal >= 100 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const orderTotal = cartTotal + shipping + tax;

  if (cartItems.length === 0) return (
    <div style={{ maxWidth: '600px', margin: '6rem auto', textAlign: 'center', padding: '0 1.5rem' }}>
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="1.5" style={{ margin: '0 auto 1.5rem', display: 'block' }}>
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', margin: '0 0 0.5rem' }}>Your cart is empty</h2>
      <p style={{ color: 'var(--warm-gray)', marginBottom: '2rem', fontSize: '0.95rem' }}>Discover our curated collection and find something you love.</p>
      <Link to="/" className="btn-primary" style={{ display: 'inline-block' }}>Browse Products</Link>
    </div>
  );

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.2rem', fontWeight: 700, margin: '0 0 2rem', letterSpacing: '-0.02em' }}>
        Your Cart <span style={{ fontSize: '1rem', fontFamily: 'DM Sans, sans-serif', color: 'var(--warm-gray)', fontWeight: 400 }}>({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '3rem', alignItems: 'start' }}>
        {/* Cart items */}
        <div>
          {cartItems.map((item, i) => (
            <div key={item._id} style={{
              display: 'grid',
              gridTemplateColumns: '100px 1fr auto',
              gap: '1.25rem',
              padding: '1.5rem 0',
              borderBottom: '1px solid var(--border)',
              alignItems: 'center',
            }}>
              {/* Image */}
              <Link to={`/products/${item.productId}`}>
                <div style={{ width: '100px', height: '100px', overflow: 'hidden', background: '#f0ebe3' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </Link>

              {/* Name + qty */}
              <div>
                <Link to={`/products/${item.productId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>{item.name}</h3>
                </Link>
                <p style={{ margin: '0 0 0.75rem', fontSize: '0.82rem', color: 'var(--warm-gray)' }}>${item.price.toFixed(2)} each</p>

                {/* Qty controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1.5px solid var(--border)', width: 'fit-content' }}>
                  <button onClick={() => updateItem(item._id, item.quantity - 1)}
                    style={{ width: '32px', height: '32px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: 'var(--charcoal)', fontFamily: 'DM Sans, sans-serif' }}>−</button>
                  <span style={{ width: '36px', textAlign: 'center', fontSize: '0.875rem', fontWeight: 600 }}>{item.quantity}</span>
                  <button onClick={() => updateItem(item._id, item.quantity + 1)}
                    style={{ width: '32px', height: '32px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: 'var(--charcoal)', fontFamily: 'DM Sans, sans-serif' }}>+</button>
                </div>
              </div>

              {/* Price + remove */}
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.5rem' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item._id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', color: 'var(--warm-gray)', textDecoration: 'underline', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.03em' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '1.5rem' }}>
            <Link to="/" style={{ fontSize: '0.82rem', color: 'var(--warm-gray)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order summary */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '2rem', position: 'sticky', top: '100px' }}>
          <h2 style={{ fontSize: '1.2rem', margin: '0 0 1.5rem', fontWeight: 600 }}>Order Summary</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--warm-gray)' }}>
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--warm-gray)' }}>
              <span>Shipping</span>
              <span>{shipping === 0 ? <span style={{ color: '#22c55e', fontWeight: 500 }}>Free</span> : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--warm-gray)' }}>
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>

          {shipping > 0 && (
            <div style={{ background: 'rgba(193,127,62,0.08)', border: '1px solid rgba(193,127,62,0.2)', padding: '0.6rem 0.75rem', marginBottom: '1.25rem', fontSize: '0.78rem', color: 'var(--accent)' }}>
              Add ${(100 - cartTotal).toFixed(2)} more for free shipping
            </div>
          )}

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontWeight: 600 }}>Total</span>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700 }}>${orderTotal.toFixed(2)}</span>
          </div>

          <button onClick={() => navigate('/checkout')} className="btn-primary" style={{ width: '100%' }}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
