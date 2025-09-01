import React from "react";

export default function Terms() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold">Conditions dâ€™utilisation</h1>
      <p className="mt-2 text-gray-600">DerniÃ¨re mise Ã  jour : {new Date().toLocaleDateString("fr-FR")}</p>

      <section className="mt-6 space-y-4">
        <p>En utilisant le site DemoShop, vous acceptez les prÃ©sentes conditions.</p>
        <h2 className="text-xl font-semibold">1. Achats</h2>
        <p>Toute commande suppose lâ€™acceptation du prix et des dÃ©lais indiquÃ©s au moment du paiement.</p>
        <h2 className="text-xl font-semibold">2. Retours</h2>
        <p>Vous disposez de 30 jours aprÃ¨s rÃ©ception pour demander un retour (produit neuf et non portÃ©).</p>
        <h2 className="text-xl font-semibold">3. Compte client</h2>
        <p>Vous Ãªtes responsable de la confidentialitÃ© de vos identifiants.</p>
        <h2 className="text-xl font-semibold">4. PropriÃ©tÃ© intellectuelle</h2>
        <p>Les contenus du site sont protÃ©gÃ©s. Toute reproduction non autorisÃ©e est interdite.</p>
      </section>
    </main>
  );
}

