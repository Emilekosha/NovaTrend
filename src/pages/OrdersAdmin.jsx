import React from "react";
import { Link } from "react-router-dom";
import { listOrders, clearOrders } from "../services/orders.js";

export default function OrdersAdmin() {
  const [orders, setOrders] = React.useState(listOrders());
  const refresh = () => setOrders(listOrders());

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Commandes (local)</h1>
        <button onClick={() => { clearOrders(); refresh(); }} className="rounded-xl border px-3 py-2">
          Vider localStorage
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="mt-4 text-gray-600">Aucune commande pour le moment.</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-[720px] w-full border">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Client</th>
                <th className="p-3 border">Montant</th>
                <th className="p-3 border">MÃ©thode</th>
                <th className="p-3 border">Statut</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td className="p-3 border">{o.id}</td>
                  <td className="p-3 border">{new Date(o.createdAt).toLocaleString()}</td>
                  <td className="p-3 border">{o.customer?.name || "-"}</td>
                  <td className="p-3 border">{o.amount} {o.currency}</td>
                  <td className="p-3 border">{o.method}</td>
                  <td className="p-3 border">{o.status}</td>
                  <td className="p-3 border">
                    <Link to={`/merci/${o.id}`} className="rounded-xl border px-3 py-1">Voir</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

