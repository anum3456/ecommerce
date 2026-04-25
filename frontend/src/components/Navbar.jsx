import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const location = useLocation();

  return (
    <nav style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }} className="sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--charcoal)', letterSpacing: '-0.02em' }}>
            Purely 
          </span>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, marginTop: '2px' }}>
            Online
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 500,
              color: location.pathname === '/' ? 'var(--charcoal)' : 'var(--warm-gray)',
              textDecoration: 'none',
              transition: 'color 0.2s',
              borderBottom: location.pathname === '/' ? '1.5px solid var(--charcoal)' : 'none',
              paddingBottom: '2px',
            }}
          >
            Shop
          </Link>
          <Link
            to="/orders"
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 500,
              color: location.pathname === '/orders' ? 'var(--charcoal)' : 'var(--warm-gray)',
              textDecoration: 'none',
              transition: 'color 0.2s',
              borderBottom: location.pathname === '/orders' ? '1.5px solid var(--charcoal)' : 'none',
              paddingBottom: '2px',
            }}
          >
            Orders
          </Link>

          {/* Cart icon */}
          <Link to="/cart" style={{ textDecoration: 'none', position: 'relative' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--charcoal)',
              background: cartCount > 0 ? 'var(--charcoal)' : 'transparent',
              border: '1.5px solid var(--charcoal)',
              padding: '0.4rem 0.9rem',
              transition: 'all 0.2s',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={cartCount > 0 ? 'white' : 'var(--charcoal)'} strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: cartCount > 0 ? 'white' : 'var(--charcoal)', letterSpacing: '0.03em' }}>
                {cartCount > 0 ? cartCount : 'Cart'}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
