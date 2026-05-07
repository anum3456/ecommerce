import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import StarRating from './StarRating';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    await addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div className="card" style={{ overflow: 'hidden' }}>
        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#f0ebe3' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
          <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
            <span className="tag">{product.category}</span>
          </div>
          {product.stock <= 5 && product.stock > 0 && (
            <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#e8472a', color: 'white', fontSize: '0.65rem', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, padding: '0.2rem 0.5rem' }}>
              Low Stock
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '1.1rem' }}>
          <StarRating rating={product.rating} reviews={product.reviews} />
          <h3 style={{ margin: '0.4rem 0 0.25rem', fontSize: '1rem', fontWeight: 600, lineHeight: 1.3 }}>
            {product.name}
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--warm-gray)', margin: '0 0 0.8rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.description}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAdd}
              className={added ? 'btn-accent' : 'btn-outline'}
              style={{ fontSize: '0.72rem', padding: '0.45rem 0.9rem' }}
            >
              {added ? '✓ Added' : '+ Cart'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
