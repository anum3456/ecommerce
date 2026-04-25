import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from '../api/axios';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    try {
      const { data } = await getCart();
      setCartItems(data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  }, []);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addItem = async (product, quantity = 1) => {
    setLoading(true);
    try {
      await addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
      await fetchCart();
    } catch (err) {
      console.error('Failed to add to cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id, quantity) => {
    if (quantity < 1) return removeItem(id);
    try {
      await updateCartItem(id, quantity);
      setCartItems(prev => prev.map(i => i._id === id ? { ...i, quantity } : i));
    } catch (err) {
      console.error('Failed to update cart item:', err);
    }
  };

  const removeItem = async (id) => {
    try {
      await removeFromCart(id);
      setCartItems(prev => prev.filter(i => i._id !== id));
    } catch (err) {
      console.error('Failed to remove cart item:', err);
    }
  };

  const emptyCart = async () => {
    try {
      await clearCart();
      setCartItems([]);
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, cartTotal, loading, addItem, updateItem, removeItem, emptyCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
