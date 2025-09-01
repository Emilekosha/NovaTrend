import React from "react";
import { Link } from "react-router-dom";

// Facile Ã  personnaliser ici
const COMPANY = {
  name: "DemoShop",
  tagline: "Votre boutique en ligne",
  phone: "+33123456789",          // format international pour tel:
  phoneDisplay: "01 23 45 67 89", // affichage humain
  email: "contact@demoshop.fr",
  address: "Paris, France",
};

function AorLink({ to, className, children }) {
  // Routes internes -> <Link>, externes/ancres -> <a>
  if (to.startsWith("/")) return <Link to={to} className={className}>{children}</Link>;
  return (
    <a
      href={to}
      className={className}
      target={to.startsWith("http") ? "_blank" : undefined}
      rel={to.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const infos = [
    { to: "/", label: "Accueil" },
    { to: "/shop", label: "Boutique" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  // ðŸ‘‰ liens vers de vraies pages (routes internes)
  const helpful = [
    { to: "/services", label: "Services" },
    { to: "/support", label: "Support" },
    { to: "/terms", label: "Conditions dâ€™utilisation" },
    { to: "/privacy", label: "Politique de confidentialitÃ©" },
  ];

  function onSubscribe(e) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    if (!email) return;
    alert(`Merci ! Nous vous Ã©crirons Ã  ${email}.`);
    e.currentTarget.reset();
  }

  return (
    <footer className="bg-black text-gray-300">
      {/* bloc principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          {/* Col 1 : Branding / Ã€ propos / Contact */}
          <div>
            <div className="flex items-center gap-2">
              <img
                src="assets/logo.svg"
                alt="Logo"
                className="h-8 w-8"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <div className="text-lg font-semibold text-white">{COMPANY.name}</div>
            </div>
            <p className="mt-1 text-xs text-gray-400">{COMPANY.tagline}</p>

            <h3 className="mt-6 text-amber-500 font-semibold">Ã€ propos</h3>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed max-w-prose">
              Nous aidons nos clients Ã  trouver les meilleurs produits au meilleur prix,
              avec un service rapide et de qualitÃ©.
            </p>

            <h4 className="mt-6 text-amber-500 font-semibold">Nous contacter</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <a href={`tel:${COMPANY.phone}`} className="hover:text-white inline-flex items-center gap-2">
                  <span className="inline-grid place-items-center h-6 w-6 rounded bg-amber-600/20 text-amber-500">â˜Ž</span>
                  {COMPANY.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white inline-flex items-center gap-2">
                  <span className="inline-grid place-items-center h-6 w-6 rounded bg-amber-600/20 text-amber-500">âœ‰</span>
                  {COMPANY.email}
                </a>
              </li>
              <li className="text-gray-400 flex items-center gap-2">
                <span className="inline-grid place-items-center h-6 w-6 rounded bg-amber-600/20 text-amber-500">ðŸ“</span>
                {COMPANY.address}
              </li>
            </ul>
          </div>

          {/* Col 2 : Informations */}
          <div>
            <h3 className="text-amber-500 font-semibold">Informations</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {infos.map((l) => (
                <li key={l.label}>
                  <AorLink to={l.to} className="hover:text-white">{l.label}</AorLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 : Liens utiles */}
          <div>
            <h3 className="text-amber-500 font-semibold">Liens utiles</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {helpful.map((l) => (
                <li key={l.label}>
                  <AorLink to={l.to} className="hover:text-white">{l.label}</AorLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 : Newsletter */}
          <div>
            <h3 className="text-amber-500 font-semibold">Sâ€™abonner pour plus dâ€™infos</h3>
            <form onSubmit={onSubscribe} className="mt-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="footer-email" className="sr-only">Email</label>
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Entrez votre email"
                  className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  aria-label="Sâ€™abonner"
                >
                  Sâ€™abonner
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* sÃ©parateur */}
        <hr className="mt-10 border-t border-white/10" />

        {/* bas de page */}
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* rÃ©seaux sociaux */}
          <div className="flex items-center gap-3">
            {[
              { href: "https://facebook.com", label: "Facebook", icon: "f" },
              { href: "https://twitter.com", label: "X/Twitter", icon: "x" },
              { href: "https://instagram.com", label: "Instagram", icon: "ig" },
              { href: "https://youtube.com", label: "YouTube", icon: "yt" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="inline-grid h-9 w-9 place-items-center rounded-full bg-amber-500 text-black font-semibold hover:bg-amber-400"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* copyright */}
          <div className="text-xs text-gray-400 text-center sm:text-right sm:flex-1">
            Â© {new Date().getFullYear()} {COMPANY.name}. Tous droits rÃ©servÃ©s.
          </div>

          {/* back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-grid h-9 w-9 place-items-center rounded bg-amber-500 text-black hover:bg-amber-400"
            aria-label="Retour en haut"
            title="Retour en haut"
          >
            â†‘
          </button>
        </div>
      </div>
    </footer>
  );
}

