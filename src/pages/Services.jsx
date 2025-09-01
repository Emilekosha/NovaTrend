import React from "react";
import { Link } from "react-router-dom";

export default function Services() {
  const services = [
    { title: "Livraison rapide", desc: "ExpÃ©dition sous 24/48h en France mÃ©tropolitaine." },
    { title: "Retours faciles", desc: "30 jours pour changer dâ€™avis, remboursement rapide." },
    { title: "Paiement sÃ©curisÃ©", desc: "Cartes, PayPal, et 3D Secure." },
    { title: "Assistance client", desc: "RÃ©ponse sous 24h ouvrÃ©es par email." },
  ];
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold">Nos services</h1>
      <p className="mt-2 text-gray-600">Voici ce que DemoShop met Ã  votre disposition.</p>
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {services.map((s) => (
          <article key={s.title} className="rounded-2xl border bg-white p-5">
            <h2 className="text-lg font-semibold">{s.title}</h2>
            <p className="mt-2 text-gray-600">{s.desc}</p>
          </article>
        ))}
      </div>
      <div className="mt-6">
        <Link to="/contact" className="inline-block rounded-xl border px-4 py-2 hover:shadow-sm">
          Une question ? Contactez-nous
        </Link>
      </div>
    </main>
  );
}

