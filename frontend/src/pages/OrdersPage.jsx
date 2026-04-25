import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../api/axios';

const STATUS_COLORS = {
  pending: { bg: '#fef9ec', color: '#d97706', border: '#fcd34d' },
  processing: { bg: '#eff6ff', color: '#2563eb', border: '#93c5fd' },
  shipped: { bg: '#f0fdf4', color: '#16a34a', border: '#86efac' },
  delivered: { bg: '#f5f5f5', color: '#6b7280', border: '#d1d5db' },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then(({ data }) => setOrders(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ maxWidth: '800px', margin: '3rem auto', padding: '0 1.5rem' }}>
      {[...Array(3)].map((_, i) => (
        <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '1.5rem', marginBottom: '1rem' }}>
          <div style={{ height: '14px', background: '#ece7df', width: '30%', marginBottom: '0.75rem' }} />
          <div style={{ height: '20px', background: '#ece7df', width: '60%' }} />
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>Order History</h1>
        <Link to="/" style={{ fontSize: '0.8rem', color: 'var(--warm-gray)', textDecoration: 'none' }}>← Back to Shop</Link>
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--warm-gray)' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="1.5" style={{ margin: '0 auto 1rem', display: 'block' }}>
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'var(--charcoal)', margin: '0 0 0.5rem' }}>No orders yet</h3>
          <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>Your order history will appear here.</p>
          <Link to="/" className="btn-primary" style={{ display: 'inline-block' }}>Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {orders.map(order => {
            const s = STATUS_COLORS[order.status] || STATUS_COLORS.pending;
            return (
              <div key={order._id} className="card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <p style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--warm-gray)', margin: '0 0 0.25rem', fontWeight: 500 }}>
                      Order ID
                    </p>
                    <p style={{ fontFamily: 'monospace', fontSize: '0.82rem', margin: 0, color: 'var(--charcoal)' }}>
                      {order._id}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.2rem 0.6rem', background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                      {order.status}
                    </span>
                    <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', fontWeight: 700 }}>
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Items preview */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  {order.items.slice(0, 4).map((item, i) => (
                    <div key={i} style={{ width: '52px', height: '52px', background: '#f0ebe3', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                      {item.image && <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                      {item.quantity > 1 && (
                        <div style={{ position: 'absolute', bottom: '2px', right: '2px', background: 'rgba(28,28,30,0.7)', color: 'white', fontSize: '0.6rem', padding: '0 3px', lineHeight: '14px' }}>×{item.quantity}</div>
                      )}
                    </div>
                  ))}
                  {order.items.length > 4 && (
                    <div style={{ width: '52px', height: '52px', background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: 'var(--warm-gray)', fontWeight: 600 }}>
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <p style={{ fontSize: '0.78rem', color: 'var(--warm-gray)', margin: 0 }}>
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'} · {order.customer.name} · {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <Link to={`/order-confirmation/${order._id}`} style={{ fontSize: '0.78rem', color: 'var(--charcoal)', textDecoration: 'underline', fontWeight: 500 }}>
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
