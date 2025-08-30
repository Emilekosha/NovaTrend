import React, { createContext, useContext } from 'react';

const STORAGE_KEY = 'demoshop:cart:v1';

const CartContext = createContext();

export function CartProvider({ children }) {
  // lecture lazy de localStorage (une seule fois)
  const [items, setItems] = React.useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // persistance
  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // dérivés
  const cartCount = items.reduce((a, i) => a + (i.qty || 1), 0);
  const cartTotal = items.reduce((a, i) => a + (i.price || 0) * (i.qty || 1), 0);

  // actions
  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(p => p.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: (next[idx].qty || 1) + qty };
        return next;
      }
      return [
        ...prev,
        { id: product.id, title: product.title, price: product.price, image: product.image, qty }
      ];
    });
  };

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, qty) => setItems(prev =>
    prev.map(i => i.id === id ? { ...i, qty: Math.max(1, Number(qty) || 1) } : i)
  );
  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, cartCount, cartTotal, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
