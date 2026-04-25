import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrder } from '../api/axios';

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrder(id)
      .then(({ data }) => setOrder(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{ maxWidth: '600px', margin: '5rem auto', textAlign: 'center', padding: '0 1.5rem' }}>
      <p style={{ color: 'var(--warm-gray)' }}>Loading your order...</p>
    </div>
  );

  return (
    <div style={{ maxWidth: '640px', margin: '4rem auto', padding: '0 1.5rem', textAlign: 'center' }}>
      {/* Success icon */}
      <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', border: '2px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      <span className="tag" style={{ display: 'inline-block', marginBottom: '0.75rem' }}>Order Confirmed</span>
      <h1 style={{ fontSize: '2.2rem', fontWeight: 700, margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>Thank you!</h1>
      <p style={{ color: 'var(--warm-gray)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
        Your order has been placed successfully.
      </p>
      <p style={{ fontSize: '0.8rem', color: 'var(--warm-gray)', marginBottom: '2.5rem', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
        Order ID: <strong style={{ color: 'var(--charcoal)' }}>{id}</strong>
      </p>

      {order && (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '2rem', textAlign: 'left', marginBottom: '2rem' }}>
          {/* Customer info */}
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--warm-gray)', margin: '0 0 0.75rem' }}>Shipping To</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.7 }}>
              <strong>{order.customer.name}</strong><br />
              {order.customer.address}<br />
              {order.customer.city}, {order.customer.zip}<br />
              <span style={{ color: 'var(--warm-gray)' }}>{order.customer.email}</span>
            </p>
          </div>

          {/* Items */}
          <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--warm-gray)', margin: '0 0 1rem' }}>Items Ordered</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {order.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{ width: '56px', height: '56px', flexShrink: 0, background: '#f0ebe3', overflow: 'hidden' }}>
                  {item.image && <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500 }}>{item.name}</p>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--warm-gray)' }}>Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                </div>
                <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Order Total</span>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700 }}>${order.total.toFixed(2)}</span>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="btn-primary" style={{ display: 'inline-block' }}>Continue Shopping</Link>
        <Link to="/orders" className="btn-outline" style={{ display: 'inline-block' }}>View All Orders</Link>
      </div>
    </div>
  );
}
