import React from "react";
import { useParams, Link } from "react-router-dom";
import { getOrder } from "../services/orders.js";

export default function ThankYou() {
  const { id } = useParams();
  const order = getOrder(id);

  if (!order) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold">Commande introuvable</h1>
        <Link to="/shop" className="mt-4 inline-block rounded-xl border px-4 py-2">Retour Ã  la boutique</Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Merci ðŸŽ‰</h1>
      <p className="mt-2 text-gray-700">NumÃ©ro de commande : <strong>{order.id}</strong></p>
      <p className="text-gray-700">Montant : <strong>{order.amount} {order.currency}</strong></p>
      <p className="text-gray-600">MÃ©thode : {order.method} â€” Statut : {order.status}</p>

      <h2 className="mt-6 font-semibold">Articles</h2>
      <ul className="mt-2 space-y-2">
        {order.items.map((it) => (
          <li key={it.id} className="flex items-center gap-3">
            <img src={it.image} alt={it.title} className="h-12 w-12 object-cover rounded border" />
            <div className="flex-1">
              <div className="font-medium">{it.title}</div>
              <div className="text-sm text-gray-500">QtÃ© {it.qty} â€” {it.price} â‚¬</div>
            </div>
          </li>
        ))}
      </ul>

      <Link to="/shop" className="mt-6 inline-block rounded-xl border px-4 py-2">Continuer vos achats</Link>
    </main>
  );
}

