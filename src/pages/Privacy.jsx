import React from "react";

export default function Privacy() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold">Politique de confidentialitÃ©</h1>
      <p className="mt-2 text-gray-600">Comment nous collectons et utilisons vos donnÃ©es.</p>

      <section className="mt-6 space-y-4">
        <h2 className="text-xl font-semibold">DonnÃ©es collectÃ©es</h2>
        <p>Nom, email, adresse, historique de commandes et donnÃ©es de navigation (cookies).</p>
        <h2 className="text-xl font-semibold">FinalitÃ©s</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-1">
          <li>Traitement de vos commandes et service client.</li>
          <li>AmÃ©lioration du site et personnalisation.</li>
          <li>Envoi dâ€™emails si vous y consentez (dÃ©sinscription possible Ã  tout moment).</li>
        </ul>
        <h2 className="text-xl font-semibold">Vos droits</h2>
        <p>AccÃ¨s, rectification, suppression. Contact : <a className="underline" href="mailto:contact@demoshop.fr">contact@demoshop.fr</a></p>
      </section>
    </main>
  );
}

