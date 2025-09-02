import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProductById } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useCompare } from "../context/CompareContext.jsx";

function Stars({ value = 0 }) {
  const rounded = Math.round(value);
  return (
    <span className="text-amber-500 text-sm" aria-label={`${value}/5`}>
      {"★".repeat(rounded)}
      <span className="text-gray-300">{"★".repeat(5 - rounded)}</span>
    </span>
  );
}

// ➜ Normalise un chemin vers le bon sous-dossier (BASE_URL) et enlève les "/" initiaux
const withBase = (p) => {
  if (!p) return p;
  if (/^https?:\/\//i.test(p)) return p;
  const clean = String(p).replace(/^\/+/, ""); // enlève les slashes de tête
  // BASE_URL finit déjà par "/"
  return `${import.meta.env.BASE_URL}${clean}`;
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addItem } = useCart();
  const { toggle: toggleWishlist, isInWishlist } = useWishlist();
  const { add: addToCompare, has: inCompare, MAX } = useCompare();

  const [qty, setQty] = React.useState(1);
  const [tab, setTab] = React.useState("desc"); // 'desc' | 'reviews'
  const [active, setActive] = React.useState(0);

  const product = getProductById(id);

  const fmt = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold mb-2">Produit introuvable</h1>
        <button
          onClick={() => navigate("/shop")}
          className="rounded-2xl border px-4 py-2"
        >
          Retour à la boutique
        </button>
      </div>
    );
  }

  // Si product.images existe on l’utilise, sinon on répète l’image principale
  const rawGallery =
    Array.isArray(product.images) && product.images.length
      ? product.images
      : [product.image, product.image, product.image, product.image];

  // ➜ Résout tous les chemins avec la base
  const gallery = rawGallery.map(withBase);

  const setFallback = (e) => {
    e.currentTarget.src = withBase("assets/hero-banner.png");
  };

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => q + 1);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
        {/* ====== Colonne gauche : galerie ====== */}
        <div>
          <div className="aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden border">
            <img
              src={gallery[active]}
              alt={product.title}
              className="w-full h-full object-cover"
              onError={setFallback}
            />
          </div>

          {/* Thumbnails */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setActive((i) => Math.max(0, i - 1))}
              className="rounded-xl border px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Image précédente"
              disabled={active === 0}
            >
              ‹
            </button>

            <div className="flex-1 overflow-x-auto">
              <div className="flex gap-3 min-w-max">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={
                      "relative h-20 w-28 shrink-0 rounded-xl overflow-hidden border " +
                      (active === i ? "border-black" : "border-gray-200")
                    }
                    aria-label={`Miniature ${i + 1}`}
                  >
                    <img
                      src={src}
                      alt={`thumb-${i}`}
                      className="h-full w-full object-cover"
                      onError={setFallback}
                    />
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() =>
                setActive((i) => Math.min(gallery.length - 1, i + 1))
              }
              className="rounded-xl border px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Image suivante"
              disabled={active === gallery.length - 1}
            >
              ›
            </button>
          </div>
        </div>

        {/* ====== Colonne droite : infos produit ====== */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
            {product.title}
          </h1>

          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
            <Stars value={product.rating} />
            <span className="text-gray-400">|</span>
            <span>1 avis client</span>
          </div>

          <div className="mt-3 text-2xl font-semibold text-red-600">
            {fmt.format(product.price)}
          </div>

          <p className="mt-4 text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* Quantité + actions */}
          <div className="mt-6 flex flex-wrap items-stretch gap-3">
            <div className="inline-flex items-center rounded-xl border">
              <button
                onClick={dec}
                className="px-3 py-3 text-gray-700 hover:bg-gray-50"
                aria-label="Diminuer la quantité"
                type="button"
              >
                −
              </button>
              <input
                type="number"
                inputMode="numeric"
                step="1"
                min="1"
                value={qty}
                onChange={(e) =>
                  setQty(Math.max(1, parseInt(e.target.value || "1", 10)))
                }
                className="w-16 text-center border-x px-2 py-3"
                aria-label="Quantité"
              />
              <button
                onClick={inc}
                className="px-3 py-3 text-gray-700 hover:bg-gray-50"
                aria-label="Augmenter la quantité"
                type="button"
              >
                +
              </button>
            </div>

            <button
              className="inline-flex items-center justify-center rounded-xl bg-black text-white px-6 py-3 font-semibold hover:opacity-95"
              onClick={() => addItem(product, Math.max(1, qty))}
              type="button"
            >
              ADD TO CART
            </button>

            {/* Voir le panier */}
            <Link
              to="/cart"
              className="inline-flex items-center justify-center rounded-xl border px-6 py-3 hover:bg-gray-50"
              aria-label="Voir le panier"
            >
              Voir le panier
            </Link>

            {/* Wishlist */}
            <button
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm hover:bg-gray-50 ${
                isInWishlist(product.id) ? "bg-gray-50" : ""
              }`}
              onClick={() => toggleWishlist(product)}
              type="button"
              aria-pressed={isInWishlist(product.id)}
              title={
                isInWishlist(product.id)
                  ? "Retirer de ma liste"
                  : "Ajouter à ma liste"
              }
            >
              {isInWishlist(product.id)
                ? "✓ Dans ma liste"
                : "♡ Ajouter à la liste"}
            </button>

            {/* Compare */}
            <button
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm hover:bg-gray-50 ${
                inCompare(product.id) ? "bg-gray-50" : ""
              }`}
              onClick={() => {
                const ok = addToCompare(product);
                if (!ok) alert(`Comparateur plein (${MAX} max).`);
              }}
              type="button"
              aria-pressed={inCompare(product.id)}
              title={
                inCompare(product.id)
                  ? "Déjà dans la comparaison"
                  : "Ajouter à la comparaison"
              }
            >
              ↔ {inCompare(product.id) ? "Dans la comparaison" : "Comparer"}
            </button>
          </div>

          {/* Meta */}
          <div className="mt-6 space-y-2 text-sm text-gray-600">
            <div>
              <span className="font-medium text-gray-800">Catégories :</span>{" "}
              {product.category}
            </div>
            <div>
              <span className="font-medium text-gray-800">Tags :</span>{" "}
              {(product.tags && product.tags.join(", ")) ||
                product.category?.toLowerCase()}
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-800">Partager :</span>
              <a href="#" className="hover:underline" aria-label="Facebook">f</a>
              <a href="#" className="hover:underline" aria-label="Twitter/X">x</a>
              <a href="#" className="hover:underline" aria-label="Pinterest">p</a>
              <a href="#" className="hover:underline" aria-label="LinkedIn">in</a>
            </div>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="mt-10">
        <div className="border-b flex items-center gap-6">
          <button
            className={
              "py-2 text-sm font-semibold " +
              (tab === "desc"
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-black")
            }
            onClick={() => setTab("desc")}
            type="button"
          >
            Description
          </button>
          <button
            className={
              "py-2 text-sm font-semibold " +
              (tab === "reviews"
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-black")
            }
            onClick={() => setTab("reviews")}
            type="button"
          >
            Avis (1)
          </button>
        </div>

        {tab === "desc" ? (
          <div className="mt-6 text-gray-700 leading-relaxed">
            <p>
              {product.description} Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Donec non est at libero vulputate rutrum.
              Pellentesque aliquet, sem eget laoreet ultrices…
            </p>
          </div>
        ) : (
          <div className="mt-6 text-gray-700">
            <p className="text-sm">
              <strong>Jean</strong> — ★★★★☆ : Très bonnes chaussures, taille
              bien.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Merci pour votre avis (démo).");
              }}
              className="mt-4 space-y-3 max-w-md"
            >
              <label className="block text-sm">Votre avis</label>
              <textarea
                rows={4}
                className="w-full rounded-xl border px-3 py-2"
                placeholder="Écrivez votre commentaire…"
                required
              />
              <button className="rounded-xl border px-4 py-2 hover:shadow-sm">
                Envoyer (démo)
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
