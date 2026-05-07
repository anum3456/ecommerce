import { useState, useEffect } from 'react';
import { getProducts } from '../api/axios';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['All', 'Home', 'Kitchen', 'Tech', 'Accessories'];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await getProducts({ category, search });
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Hero header */}
      <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
        <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, margin: '0 0 0.5rem' }}>
          Curated Collection
        </p>
        <h1 style={{ fontSize: '2.6rem', fontWeight: 700, margin: '0 0 0.5rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          The Shop
        </h1>
        <p style={{ color: 'var(--warm-gray)', fontSize: '0.95rem', margin: 0 }}>
          Thoughtfully made objects for everyday living.
        </p>
      </div>

      {/* Search + Filter row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Category tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '0.4rem 1rem',
                fontSize: '0.78rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontWeight: 500,
                fontFamily: 'DM Sans, sans-serif',
                border: '1.5px solid',
                borderColor: category === cat ? 'var(--charcoal)' : 'var(--border)',
                background: category === cat ? 'var(--charcoal)' : 'transparent',
                color: category === cat ? 'white' : 'var(--warm-gray)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0' }}>
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search products..."
            style={{
              padding: '0.5rem 1rem',
              border: '1.5px solid var(--border)',
              borderRight: 'none',
              outline: 'none',
              fontSize: '0.85rem',
              background: 'var(--surface)',
              width: '220px',
              color: 'var(--charcoal)',
            }}
          />
          <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1rem', borderLeft: 'none' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
          {search && (
            <button type="button" onClick={() => { setSearch(''); setSearchInput(''); }} className="btn-outline" style={{ marginLeft: '0.5rem', padding: '0.5rem 0.75rem' }}>
              ✕
            </button>
          )}
        </form>
      </div>

      {/* Results count */}
      {!loading && (
        <p style={{ fontSize: '0.8rem', color: 'var(--warm-gray)', marginBottom: '1.5rem' }}>
          {products.length} {products.length === 1 ? 'product' : 'products'} found
          {search && ` for "${search}"`}
        </p>
      )}

      {/* States */}
      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '1.25rem', marginBottom: '2rem', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ aspectRatio: '4/3', background: 'linear-gradient(90deg, #ece7df 25%, #f5f0e8 50%, #ece7df 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
              <div style={{ padding: '1.1rem' }}>
                <div style={{ height: '12px', background: '#ece7df', marginBottom: '8px', width: '60%' }} />
                <div style={{ height: '20px', background: '#ece7df', marginBottom: '8px' }} />
                <div style={{ height: '14px', background: '#ece7df', width: '80%' }} />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--warm-gray)' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.4 }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'var(--charcoal)', margin: '0 0 0.5rem' }}>No products found</h3>
          <p style={{ fontSize: '0.875rem' }}>Try a different search or category.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
