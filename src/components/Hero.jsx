import React from "react";
import { useNavigate } from "react-router-dom";
import BrandStrip from "./BrandStrip.jsx";

export default function Hero() {
  const navigate = useNavigate();

  return (
    // â¬…ï¸ coupe tout dÃ©bordement horizontal causÃ© par les blobs floutÃ©s
    <section className="relative overflow-x-clip">
      {/* dÃ©cor de fond */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-indigo-400/40 to-fuchsia-400/40 blur-3xl" />
        <div className="absolute bottom-[-4rem] right-[-4rem] h-80 w-80 rounded-full bg-gradient-to-tr from-amber-300/40 to-pink-400/40 blur-3xl" />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10">
        {/* carte hero */}
        <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 backdrop-blur shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]">
          {/* bandeau dÃ©co fin */}
          <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400" />

          <div className="grid md:grid-cols-2 gap-5 sm:gap-6 items-center p-5 sm:p-8 lg:p-10">
            {/* Colonne gauche */}
            <div>
              {/* eyebrow / badge */}
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-700 border-gray-200 bg-white/70">
                <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
                Nouvelle collection
              </div>

              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-900 to-gray-700">
                  Nouvelles arrivÃ©es
                </span>
              </h1>

              <p className="mt-3 text-gray-600 max-w-prose">
                Utilise tes propres visuels : banniÃ¨res, produits, marques.
                Design Ã©purÃ©, rapide et prÃªt pour le mobile.
              </p>

              {/* points forts */}
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {[
                  "Livraison gratuite dÃ¨s 80â‚¬",
                  "Retours sous 30 jours",
                  "Paiements sÃ©curisÃ©s",
                ].map((t, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="inline-grid h-5 w-5 place-items-center rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white text-[10px]">
                      âœ“
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("/shop")}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-5 py-3 text-white font-medium shadow-lg shadow-indigo-600/20 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  Voir la boutique
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-gray-800 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  Nous contacter
                </button>
              </div>
            </div>

            {/* Colonne droite (visuel) */}
            <div className="relative">
              {/* â¬…ï¸ moins haut sur mobile */}
              <div className="rounded-3xl overflow-hidden border bg-white aspect-[3/2] sm:aspect-[4/3] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.25)]">
                <img
                  src="assets/banner-img-1.jpg"
                  onError={(e) => {
                    e.currentTarget.src = "assets/hero-banner.png";
                  }}
                  alt="BanniÃ¨re"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* pastille promo â€” garde-la dans la carte sur mobile */}
              <div className="absolute -top-3 right-2 sm:right-3 md:-right-3">
                <div className="rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 shadow-lg">
                  -20% cette semaine
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pense Ã  mettre overflow-x-auto dans BrandStrip si beaucoup de logos */}
      {/* <BrandStrip /> */}
    </section>
  );
}

