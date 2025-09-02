import React from "react";
import { Link } from "react-router-dom";

const ALL_POSTS = [
  {
    id: 1,
    title: "Tendances 2025 : les essentiels",
    image: "assets/blog_1.jpg",
    excerpt: "Couleurs franches, matières techniques et coupes minimalistes au programme.",
    category: "Tendances",
    date: "2025-02-10",
    read: "5 min",
    author: "Équipe DemoShop",
  },
  {
    id: 2,
    title: "Bien choisir sa taille",
    image: "assets/blog_2.jpg",
    excerpt: "Le guide simple pour éviter les retours et trouver l’ajustement parfait.",
    category: "Guides",
    date: "2025-01-28",
    read: "4 min",
    author: "Camille",
  },
  {
    id: 3,
    title: "Matériaux durables : que regarder ?",
    image: "assets/blog_3.jpg",
    excerpt: "Coton recyclé, caoutchouc naturel, polyester certifié… on fait le point.",
    category: "Durabilité",
    date: "2025-01-08",
    read: "6 min",
    author: "Léo",
  },
  {
    id: 4,
    title: "Entretenir ses sneakers",
    image: "assets/collection-2.jpg",
    excerpt: "Nos astuces simples pour garder vos paires comme neuves.",
    category: "Guides",
    date: "2024-12-18",
    read: "3 min",
    author: "Équipe DemoShop",
  },
  {
    id: 5,
    title: "Lookbook printemps",
    image: "assets/collection-1.jpg",
    excerpt: "Des silhouettes faciles à porter, du bureau au week-end.",
    category: "Tendances",
    date: "2024-12-01",
    read: "4 min",
    author: "Nina",
  },
  {
    id: 6,
    title: "Labels & certifications",
    image: "assets/collection-3.jpg",
    excerpt: "Oeko-Tex, GRS, FSC… que signifient ces logos sur vos produits ?",
    category: "Durabilité",
    date: "2024-11-15",
    read: "7 min",
    author: "Léo",
  },
];

export default function Blog() {
  const [query, setQuery] = React.useState("");
  const [cat, setCat] = React.useState("Tous");

  const categories = ["Tous", ...Array.from(new Set(ALL_POSTS.map(p => p.category)))];

  const posts = ALL_POSTS
    .filter(p => (cat === "Tous" ? true : p.category === cat))
    .filter(p =>
      (p.title + p.excerpt).toLowerCase().includes(query.trim().toLowerCase())
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  const featured = posts[0];
  const rest = posts.slice(1);

  function onSubscribe(e) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    if (!email) return;
    alert(`Merci ! Nous vous écrirons à ${email}.`);
    e.currentTarget.reset();
  }

  const chip = (label) => {
    const base =
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";
    if (label === "Tendances") return base + " bg-blue-100 text-blue-700";
    if (label === "Guides") return base + " bg-amber-100 text-amber-700";
    if (label === "Durabilité") return base + " bg-orange-100 text-orange-700";
    return base + " bg-gray-100 text-gray-700";
  };

  const imgFallback = (e) => {
    e.currentTarget.style.opacity = "0.3";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Magazine</h1>
          <p className="text-gray-600">Conseils, tendances et coulisses de DemoShop.</p>
        </div>

        {/* Recherche */}
        <div className="w-full sm:w-80">
          <label className="sr-only">Rechercher</label>
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un article…"
              className="w-full rounded-xl border px-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>
      </header>

      {/* Filtres */}
      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={
              "rounded-full border px-4 py-1.5 text-sm transition " +
              (cat === c
                ? "bg-black text-white border-black"
                : "bg-white hover:bg-gray-50")
            }
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grille principale */}
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Colonne principale (à gauche) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Article à la une */}
          {featured && (
            <article className="overflow-hidden rounded-3xl border bg-white hover:shadow-lg transition-shadow">
              <Link to={`/blog`} className="block">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={imgFallback}
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className={chip(featured.category)}>{featured.category}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(featured.date).toLocaleDateString("fr-FR")} • {featured.read}
                    </span>
                  </div>
                  <h2 className="mt-3 text-2xl sm:text-3xl font-bold leading-tight">
                    {featured.title}
                  </h2>
                  <p className="mt-2 text-gray-600">{featured.excerpt}</p>
                  <div className="mt-4 text-blue-700 font-semibold">Lire l’article →</div>
                </div>
              </Link>
            </article>
          )}

          {/* Autres articles */}
          {rest.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-6">
              {rest.map((p) => (
                <article
                  key={p.id}
                  className="overflow-hidden rounded-2xl border bg-white hover:shadow-md transition-shadow"
                >
                  <Link to={`/blog`} className="block">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        onError={imgFallback}
                      />
                    </div>
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className={chip(p.category)}>{p.category}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(p.date).toLocaleDateString("fr-FR")} • {p.read}
                        </span>
                      </div>
                      <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                      <p className="mt-1 text-gray-600">{p.excerpt}</p>
                      <div className="mt-3 text-blue-700 font-semibold text-sm">
                        Lire →
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar (droite) */}
        <aside className="space-y-6">
          {/* Newsletter */}
          <div className="rounded-2xl border bg-white p-5">
            <h4 className="text-lg font-semibold">Newsletter</h4>
            <p className="mt-1 text-sm text-gray-600">
              Nouveaux articles, guides et promos — 1 fois par mois.
            </p>
            <form onSubmit={onSubscribe} className="mt-3 flex gap-2">
              <label htmlFor="blog-news" className="sr-only">Email</label>
              <input
                id="blog-news"
                name="email"
                type="email"
                required
                placeholder="Votre email"
                className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="rounded-xl bg-black text-white px-4 py-2">
                S’abonner
              </button>
            </form>
          </div>

          {/* Catégories */}
          <div className="rounded-2xl border bg-white p-5">
            <h4 className="text-lg font-semibold">Catégories</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {categories.map((c) => (
                <li key={c} className="flex items-center justify-between">
                  <button
                    onClick={() => setCat(c)}
                    className={
                      "text-left hover:underline " + (cat === c ? "font-semibold" : "")
                    }
                  >
                    {c}
                  </button>
                  <span className="text-gray-400">
                    {ALL_POSTS.filter(p => (c === "Tous" ? true : p.category === c)).length}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* À propos */}
          <div className="rounded-2xl border bg-white p-5">
            <h4 className="text-lg font-semibold">À propos</h4>
            <p className="mt-2 text-sm text-gray-600">
              Nous partageons ici nos inspirations, nos conseils produits et les coulisses de
              DemoShop. Bonne lecture&nbsp;!
            </p>
            <Link to="/contact" className="mt-3 inline-block rounded-xl border px-4 py-2 hover:bg-gray-50">
              Nous contacter
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
