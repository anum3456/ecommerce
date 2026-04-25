import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrdersPage from './pages/OrdersPage';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div style={{ minHeight: '100vh', background: 'var(--sand)' }}>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Routes>
          </main>
          <footer style={{ marginTop: '5rem', borderTop: '1px solid var(--border)', padding: '2rem 1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--warm-gray)', margin: 0, letterSpacing: '0.04em' }}>
              © 2026 <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, color: 'var(--charcoal)' }}>PurelyOnline</span> · eCommerce Store
            </p>
          </footer>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
