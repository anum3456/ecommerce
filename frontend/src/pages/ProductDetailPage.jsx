import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProduct } from '../api/axios';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getProduct(id);
        setProduct(data);
      } catch {
        setError('Product not found.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleAdd = async () => {
    await addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = async () => {
    await addItem(product, qty);
    navigate('/cart');
  };

  if (loading) return (
    <div style={{ maxWidth: '1100px', margin: '3rem auto', padding: '0 1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
        <div style={{ aspectRatio: '1', background: '#ece7df' }} />
        <div>
          <div style={{ height: '14px', background: '#ece7df', width: '40%', marginBottom: '1rem' }} />
          <div style={{ height: '40px', background: '#ece7df', marginBottom: '1rem' }} />
          <div style={{ height: '20px', background: '#ece7df', width: '30%', marginBottom: '2rem' }} />
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div style={{ maxWidth: '600px', margin: '5rem auto', textAlign: 'center', padding: '0 1.5rem' }}>
      <p style={{ color: '#dc2626' }}>{error}</p>
      <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>Back to Shop</Link>
    </div>
  );

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '2rem', fontSize: '0.8rem', color: 'var(--warm-gray)' }}>
        <Link to="/" style={{ color: 'var(--warm-gray)', textDecoration: 'none' }}>Shop</Link>
        <span>/</span>
        <span className="tag">{product.category}</span>
        <span>/</span>
        <span style={{ color: 'var(--charcoal)' }}>{product.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
        {/* Image */}
        <div style={{ background: '#f0ebe3', aspectRatio: '1', overflow: 'hidden', position: 'sticky', top: '100px' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>

        {/* Details */}
        <div>
          <span className="tag" style={{ display: 'inline-block', marginBottom: '1rem' }}>{product.category}</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, margin: '0 0 0.75rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            {product.name}
          </h1>
          <StarRating rating={product.rating} reviews={product.reviews} />

          <div style={{ margin: '1.5rem 0', padding: '1.5rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>
              ${product.price.toFixed(2)}
            </span>
          </div>

          <p style={{ color: 'var(--warm-gray)', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: '2rem' }}>
            {product.description}
          </p>

          {/* Stock indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: product.stock > 5 ? '#22c55e' : product.stock > 0 ? '#f59e0b' : '#ef4444' }} />
            <span style={{ fontSize: '0.82rem', color: 'var(--warm-gray)' }}>
              {product.stock > 5 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
            </span>
          </div>

          {/* Qty + Add to cart */}
          {product.stock > 0 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '1rem', border: '1.5px solid var(--border)', width: 'fit-content' }}>
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ width: '40px', height: '44px', fontSize: '1.2rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--charcoal)', fontFamily: 'DM Sans, sans-serif' }}
                >−</button>
                <span style={{ width: '44px', textAlign: 'center', fontWeight: 600, fontSize: '0.95rem' }}>{qty}</span>
                <button
                  onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                  style={{ width: '40px', height: '44px', fontSize: '1.2rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--charcoal)', fontFamily: 'DM Sans, sans-serif' }}
                >+</button>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button onClick={handleAdd} className={added ? 'btn-accent' : 'btn-primary'} style={{ flex: 1, minWidth: '160px' }}>
                  {added ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
                <button onClick={handleBuyNow} className="btn-outline" style={{ flex: 1, minWidth: '120px' }}>
                  Buy Now
                </button>
              </div>
            </>
          )}

          {/* Shipping note */}
          <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(193,127,62,0.06)', border: '1px solid rgba(193,127,62,0.2)' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--warm-gray)', margin: 0, lineHeight: 1.6 }}>
              🚚 Free shipping on orders over $100 · Returns accepted within 30 days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
