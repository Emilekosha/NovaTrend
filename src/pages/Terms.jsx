import React from "react";

export default function Terms() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold">Conditions d’utilisation</h1>
      <p className="mt-2 text-gray-600">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>

      <section className="mt-6 space-y-4">
        <p>En utilisant le site DemoShop, vous acceptez les présentes conditions.</p>
        <h2 className="text-xl font-semibold">1. Achats</h2>
        <p>Toute commande suppose l’acceptation du prix et des délais indiqués au moment du paiement.</p>
        <h2 className="text-xl font-semibold">2. Retours</h2>
        <p>Vous disposez de 30 jours après réception pour demander un retour (produit neuf et non porté).</p>
        <h2 className="text-xl font-semibold">3. Compte client</h2>
        <p>Vous êtes responsable de la confidentialité de vos identifiants.</p>
        <h2 className="text-xl font-semibold">4. Propriété intellectuelle</h2>
        <p>Les contenus du site sont protégés. Toute reproduction non autorisée est interdite.</p>
      </section>
    </main>
  );
}
