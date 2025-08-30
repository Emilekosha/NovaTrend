import React, { createContext, useContext } from "react";

const STORAGE_KEY = "demoshop:compare:v1";
const MAX = 3;
const Ctx = createContext();

export function CompareProvider({ children }) {
  const [items, setItems] = React.useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const has = (id) => items.some((p) => p.id === id);

  const add = (product) => {
    if (has(product.id)) return true; // déjà présent
    if (items.length >= MAX) return false; // plein
    setItems((prev) => [
      ...prev,
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        rating: product.rating,
      },
    ]);
    return true;
  };

  const remove = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
  const clear = () => setItems([]);

  return (
    <Ctx.Provider value={{ items, count: items.length, add, remove, has, clear, MAX }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCompare = () => useContext(Ctx);
