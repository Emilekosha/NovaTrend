import React from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/orders.js";
import { useCart } from "../context/CartContext.jsx";

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart(); // nécessite que items soit exposé par CartContext
  const navigate = useNavigate();
  const fmt = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

  const [method, setMethod] = React.useState("card"); // 'card' | 'mobile' | 'cod'
  const [processing, setProcessing] = React.useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (processing) return;
    setProcessing(true);

    // Si panier vide, on bloque
    if (!items || items.length === 0) {
      alert("Votre panier est vide.");
      setProcessing(false);
      return;
    }

    const form = new FormData(e.currentTarget);
    const name = form.get("name") || "client";

    // Validation spécifique Mobile Money
    if (method === "mobile") {
      const phone = (form.get("walletPhone") || "").trim();
      if (!phone) {
        alert("Merci d’indiquer le numéro Mobile Money.");
        setProcessing(false);
        return;
      }
    }

    // Construire et enregistrer la commande (démo: localStorage)
    const order = createOrder({
      items: (items || []).map(({ id, title, price, image, qty }) => ({
        id, title, price, image, qty,
      })),
      amount: cartTotal,
      currency: "EUR",
      method, // 'card' | 'mobile' | 'cod'
      status: method === "cod" ? "to_collect" : "pending",
      customer: {
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        address: form.get("address"),
        city: form.get("city"),
        zip: form.get("zip"),
        country: form.get("country"),
      },
      note: form.get("note") || "",
      paymentRef: undefined, // à renseigner si tu branches Stripe/PayPal/etc.
    });

    clearCart();
    navigate(`/merci/${order.id}`);
  }

  const inputBase =
    "w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 " +
    "border-sky-100 focus:ring-sky-300/60";
  const box = "rounded-2xl border p-4 bg-white";
  const disabled = processing || cartTotal <= 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Carte visuelle avec accents bleu / jaune / orange */}
      <div className="rounded-3xl border bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)] overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-sky-500 via-amber-400 to-orange-500" />
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 via-amber-600 to-orange-600">
              Paiement
            </span>
          </h1>
          <p className="mt-1 text-gray-600">
            Finalisez votre commande en toute sécurité.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-6">
            {/* Infos client */}
            <div>
              <label className="block text-sm mb-1">Nom complet</label>
              <input name="name" className={inputBase} required />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input type="email" name="email" className={inputBase} required />
              </div>
              <div>
                <label className="block text-sm mb-1">Téléphone</label>
                <input name="phone" className={inputBase} inputMode="tel" />
              </div>
            </div>

            {/* Adresse */}
            <div>
              <label className="block text-sm mb-1">Adresse</label>
              <input name="address" className={inputBase} required />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1">Ville</label>
                <input name="city" className={inputBase} required />
              </div>
              <div>
                <label className="block text-sm mb-1">Code postal</label>
                <input name="zip" className={inputBase} required />
              </div>
              <div>
                <label className="block text-sm mb-1">Pays</label>
                <input name="country" defaultValue="France" className={inputBase} required />
              </div>
            </div>

            {/* Note (optionnelle) */}
            <div>
              <label className="block text-sm mb-1">Note (optionnel)</label>
              <textarea name="note" rows={3} className={inputBase} placeholder="Infos de livraison, interphone, etc." />
            </div>

            {/* Sélecteur de méthode */}
            <fieldset className="grid gap-3 sm:grid-cols-3">
              {[
                { id: "card", title: "Carte bancaire", note: "Visa/Mastercard (démo)" },
                { id: "mobile", title: "Mobile Money", note: "MTN / Orange / Airtel / Wave" },
                { id: "cod", title: "À la livraison", note: "Espèces / TPV au livreur" },
              ].map((m) => {
                const selected =
                  method === m.id
                    ? m.id === "card"
                      ? "border-sky-600 ring-2 ring-sky-600/20"
                      : m.id === "mobile"
                      ? "border-amber-500 ring-2 ring-amber-500/20"
                      : "border-orange-600 ring-2 ring-orange-600/20"
                    : "hover:shadow-sm";
                return (
                  <label key={m.id} className={`${box} cursor-pointer transition ${selected}`}>
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="method"
                        value={m.id}
                        checked={method === m.id}
                        onChange={() => setMethod(m.id)}
                        className="mt-1 accent-sky-600"
                      />
                      <div>
                        <div className="font-semibold">{m.title}</div>
                        <div className="text-sm text-gray-600">{m.note}</div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </fieldset>

            {/* Bloc Carte */}
            {method === "card" && (
              <div className={`${box} border-sky-100`}>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-sky-800">Paiement par carte</h2>
                  <div className="hidden sm:flex gap-1 text-xs">
                    <span className="inline-flex rounded border border-sky-200 bg-sky-50 text-sky-700 px-2 py-1">VISA</span>
                    <span className="inline-flex rounded border border-orange-200 bg-orange-50 text-orange-700 px-2 py-1">MC</span>
                  </div>
                </div>
                <div className="mt-3 grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Numéro de carte (démo)</label>
                    <input className={inputBase} name="card" placeholder="4242 4242 4242 4242" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1">Expiration</label>
                      <input className={inputBase} name="exp" placeholder="12/26" />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">CVC</label>
                      <input className={inputBase} name="cvc" placeholder="123" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bloc Mobile Money */}
            {method === "mobile" && (
              <div className={`${box} border-amber-200`}>
                <h2 className="text-lg font-semibold text-amber-700">Paiement Mobile Money</h2>
                <p className="text-sm text-gray-600">Nous vous enverrons une demande de paiement sur votre portefeuille.</p>
                <div className="mt-3 grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Opérateur</label>
                    <select name="walletProvider" className={inputBase} defaultValue="MTN">
                      {["MTN", "Orange", "Airtel", "Wave", "Autre"].map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Numéro de portefeuille</label>
                    <input
                      name="walletPhone"
                      className={inputBase}
                      inputMode="tel"
                      placeholder="Ex : 07 12 34 56 78"
                      required
                    />
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500">Démo : pas de transaction réelle.</p>
              </div>
            )}

            {/* Bloc COD */}
            {method === "cod" && (
              <div className={`${box} border-orange-200`}>
                <h2 className="text-lg font-semibold text-orange-700">Paiement à la livraison</h2>
                <p className="text-sm text-gray-600">Réglez votre commande au livreur (espèces ou terminal bancaire).</p>
                <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1">
                  <li>Vérifiez l’adresse et le téléphone.</li>
                  <li>Le livreur vous contactera avant la remise du colis.</li>
                </ul>
              </div>
            )}

            {/* CTA + Total */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                type="submit"
                disabled={disabled}
                className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-white transition
                  ${disabled ? "bg-gray-400" : "bg-gradient-to-r from-sky-600 via-amber-500 to-orange-600 hover:opacity-95"}`}
                aria-disabled={disabled}
              >
                {processing ? "Traitement…" : cartTotal > 0 ? "Valider la commande" : "Panier vide"}
              </button>

              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-sky-500 via-amber-400 to-orange-500" />
                Total : <strong className="text-sky-800">{fmt.format(cartTotal)}</strong>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
