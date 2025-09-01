import React from "react";
import { Link } from "react-router-dom";
import { useCompare } from "../context/CompareContext.jsx";

export default function Compare() {
  const { items, remove, clear, MAX } = useCompare();

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Comparer ({items.length}/{MAX})</h1>
        {items.length > 0 && (
          <button onClick={clear} className="rounded-xl border px-3 py-2">Vider</button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-4 text-gray-600">
          Aucune sÃ©lection pour le moment. <Link className="underline" to="/shop">Choisir des produits</Link>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-[720px] w-full border">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="p-3 border">Produit</th>
                <th className="p-3 border">Prix</th>
                <th className="p-3 border">CatÃ©gorie</th>
                <th className="p-3 border">Note</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="align-top">
                  <td className="p-3 border">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.title} className="h-16 w-20 object-cover rounded-lg border" />
                      <div>
                        <Link to={`/product/${p.id}`} className="font-semibold hover:underline">{p.title}</Link>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 border">{p.price} â‚¬</td>
                  <td className="p-3 border">{p.category}</td>
                  <td className="p-3 border">{p.rating} / 5</td>
                  <td className="p-3 border">
                    <button onClick={() => remove(p.id)} className="rounded-xl border px-3 py-2">Retirer</button>
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

