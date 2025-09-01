import React, { createContext, useContext } from "react";

const STORAGE_KEY = "demoshop:wishlist:v1";
const Ctx = createContext();

export function WishlistProvider({ children }) {
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

  const isInWishlist = (id) => items.some((p) => p.id === id);

  const add = (product) =>
    setItems((prev) =>
      isInWishlist(product.id)
        ? prev
        : [
            ...prev,
            {
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
              category: product.category,
              rating: product.rating,
            },
          ]
    );

  const remove = (id) => setItems((prev) => prev.filter((p) => p.id !== id));

  const toggle = (product) => (isInWishlist(product.id) ? remove(product.id) : add(product));

  return (
    <Ctx.Provider value={{ items, count: items.length, add, remove, toggle, isInWishlist }}>
      {children}
    </Ctx.Provider>
  );
}

export const useWishlist = () => useContext(Ctx);

