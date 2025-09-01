import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext.jsx";

export default function Wishlist() {
  const { items, remove } = useWishlist();

  if (!items.length) {
    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold">Ma liste</h1>
        <p className="mt-2 text-gray-600">Votre liste est vide.</p>
        <Link to="/shop" className="mt-4 inline-block rounded-xl border px-4 py-2">
          Parcourir la boutique
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold">Ma liste</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <article key={p.id} className="rounded-2xl border overflow-hidden bg-white">
            <Link to={`/product/${p.id}`} className="block aspect-[4/3] bg-gray-50">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
            </Link>
            <div className="p-4">
              <h3 className="font-semibold">
                <Link to={`/product/${p.id}`} className="hover:underline">{p.title}</Link>
              </h3>
              <div className="text-sm text-gray-500">{p.category}</div>
              <div className="mt-3 flex items-center gap-2">
                <Link to={`/product/${p.id}`} className="rounded-xl border px-3 py-2">Voir</Link>
                <button onClick={() => remove(p.id)} className="rounded-xl border px-3 py-2">
                  Retirer
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

