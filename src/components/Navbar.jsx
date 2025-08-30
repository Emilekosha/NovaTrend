import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import logoImg from "../assets/logo.png";

export default function Navbar() {
  const { cartCount } = useCart();
  const [open, setOpen] = React.useState(false);
  const [logoError, setLogoError] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => setOpen(false), [location.pathname]);

  const linkClass = ({ isActive }) =>
    [
      "relative block px-4 py-2 rounded-xl transition-colors",
      "hover:bg-gray-100 text-gray-700",
      isActive &&
        'bg-gray-100 text-gray-900 after:content-[""] after:absolute after:left-3 after:right-3 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-indigo-500 after:to-fuchsia-500',
    ]
      .filter(Boolean)
      .join(" ");

  const links = [
    { to: "/", label: "Accueil", end: true },
    { to: "/shop", label: "Boutique" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50">
      <div className="bg-white/90 backdrop-blur border-b border-white/40 shadow-sm">
        <div className="max-w-7xl mx-auto h-16 px-3 sm:px-4 lg:px-8 flex items-center gap-3">
          {/* Logo image */}
          <Link
            to="/"
            className="flex items-center min-w-0"
            aria-label="Accueil DemoShop"
          >
            <img
              src={logoImg || "/assets/logo.png"} // si tu utilises public/assets
              alt="DemoShop"
              width="120"
              height="32"
              className="h-8 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }} // masque l'image cassée
              decoding="async"
            />
            <span  className="ml-2 text-lg sm:text-xl font-extrabold tracking-tight
             bg-gradient-to-r from-sky-600 via-amber-500 to-orange-600
             bg-clip-text text-transparent">
              NovaTrend
            </span>
          </Link>

          {/* Liens desktop */}
          <div className="ml-auto hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}

            {/* Panier (desktop) */}
            <Link
              to="/cart"
              className="ml-2 inline-flex items-center gap-2 rounded-full border px-3 py-2 hover:shadow-sm"
              aria-label="Ouvrir le panier"
            >
              <span>Panier</span>
              <span className="inline-flex items-center justify-center min-w-[1.5rem] h-6 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white text-sm px-2">
                {cartCount}
              </span>
            </Link>
          </div>

          {/* Actions mobile : panier + hamburger */}
          <div className="ml-auto md:hidden flex items-center gap-2">
            <Link
              to="/cart"
              className="relative rounded-full border px-3 py-2 hover:bg-gray-50"
              aria-label="Ouvrir le panier"
            >
              <span className="text-sm">Panier</span>
              <span className="ml-1 inline-flex items-center justify-center min-w-[1.25rem] h-5 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white text-xs px-1">
                {cartCount}
              </span>
            </Link>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border px-3 py-2 hover:bg-gray-50"
              aria-controls="mobile-nav"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="sr-only">Ouvrir/fermer le menu</span>
              <svg
                className={`h-5 w-5 ${open ? "hidden" : "block"}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
              <svg
                className={`h-5 w-5 ${open ? "block" : "hidden"}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400" />

      {/* Menu mobile */}
      <div
        id="mobile-nav"
        className={`md:hidden bg-white/95 backdrop-blur border-b overflow-hidden grid transition-[grid-template-rows] duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="max-w-7xl mx-auto px-3 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
