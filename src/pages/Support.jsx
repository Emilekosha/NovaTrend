import React from "react";

export default function Support() {
  const faq = [
    ["OÃ¹ est ma commande ?", "Connectez-vous puis ouvrez Panier > Historique pour suivre la livraison."],
    ["Comment retourner un article ?", "Depuis votre email de commande, cliquez sur â€œRetourner un articleâ€. Nous vous guidons."],
    ["Quels moyens de paiement ?", "Visa, MasterCard, PayPal. Tous les paiements sont sÃ©curisÃ©s (3D Secure)."],
  ];
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold">Support</h1>
      <p className="mt-2 text-gray-600">Retrouvez ici les rÃ©ponses aux questions courantes.</p>
      <div className="mt-6 space-y-4">
        {faq.map(([q, a]) => (
          <details key={q} className="rounded-2xl border bg-white p-5">
            <summary className="cursor-pointer text-lg font-semibold">{q}</summary>
            <p className="mt-2 text-gray-600">{a}</p>
          </details>
        ))}
      </div>
      <p className="mt-6 text-gray-600">
        Besoin dâ€™aide ? Ã‰crivez-nous :{" "}
        <a className="underline" href="mailto:contact@demoshop.fr">contact@demoshop.fr</a>
      </p>
    </main>
  );
}

