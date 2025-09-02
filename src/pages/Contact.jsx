import React from "react";

export default function Contact() {
  function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    alert(`Merci ${form.get("name") || "à vous"} ! Nous répondons sous 24h.`);
    e.currentTarget.reset();
  }

  const inputCls =
    "w-full rounded-xl border border-sky-200 bg-white px-3 py-3 md:py-2 " +
    "text-sm sm:text-base text-gray-900 placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400";

  const socials = [
    { key: "Facebook",  href: "https://facebook.com/demoshop",                   label: "Facebook",      text: "f"  },
    { key: "X",         href: "https://twitter.com/demoshop",                    label: "X (Twitter)",   text: "x"  },
    { key: "Instagram", href: "https://instagram.com/demoshop",                  label: "Instagram",     text: "ig" },
    { key: "LinkedIn",  href: "https://linkedin.com/company/demoshop",           label: "LinkedIn",      text: "in" },
    { key: "YouTube",   href: "https://youtube.com/@demoshop",                   label: "YouTube",       text: "yt" },
  ];

  return (
    <div className="bg-white text-gray-900 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <div className="grid gap-8 md:grid-cols-2">
          {/* ===== Colonne gauche : intro / info ===== */}
          <aside>
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-amber-100 text-amber-700">
              Support sous 24h
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
              Contactez-nous
            </h1>
            <p className="mt-2 text-gray-600 max-w-prose">
              Une question sur une commande, un produit, un retour ? Remplissez le
              formulaire, notre équipe vous répond rapidement.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="mailto:contact@demoshop.fr"
                className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 hover:bg-sky-100 transition"
              >
                <div className="text-sm font-semibold text-sky-800">Email</div>
                <div className="text-gray-700">contact@demoshop.fr</div>
              </a>
              <a
                href="tel:+33123456789"
                className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 hover:bg-orange-100 transition"
              >
                <div className="text-sm font-semibold text-orange-800">Téléphone</div>
                <div className="text-gray-700">01 23 45 67 89</div>
              </a>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <div className="font-semibold text-gray-800">Horaires</div>
              <div>Lun–Ven : 9h–18h · Sam : 10h–16h</div>
            </div>
          </aside>

          {/* ===== Colonne droite : formulaire + réseaux cliquables ===== */}
          <section>
            <div className="rounded-2xl border border-sky-100 bg-white p-4 sm:p-6 lg:p-7 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]">
              <h2 className="text-lg font-semibold">Écrivez-nous</h2>
              <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm text-gray-700">
                    Nom
                  </label>
                  <input id="name" name="name" placeholder="John Carter" className={inputCls} />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="vous@email.com"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm text-gray-700">
                    Téléphone
                  </label>
                  <input id="phone" name="phone" placeholder="01 23 45 67 89" className={inputCls} />
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm text-gray-700">
                    Sujet
                  </label>
                  <input id="subject" name="subject" placeholder="Ex. Commande #1234" className={inputCls} />
                </div>

                <div className="lg:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-sm text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Votre message…"
                    required
                    className={inputCls}
                  />
                </div>

                <div className="lg:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 font-medium
                               text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-500
                               focus:outline-none focus:ring-2 focus:ring-sky-300"
                  >
                    Envoyer le message
                  </button>

                  {/* Réseaux cliquables */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Ou via :</span>
                    <div className="flex items-center gap-2">
                      {socials.map((s) => (
                        <a
                          key={s.key}
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={s.label}
                          className="inline-grid h-9 w-9 place-items-center rounded-full border
                                     hover:shadow-sm transition
                                     border-amber-200 bg-amber-50 text-amber-700
                                     hover:bg-amber-100"
                          title={s.label}
                        >
                          {s.text}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </form>

              {/* Bandeau d’info (couleur jaune/orange) */}
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                💡 Astuce : pensez à vérifier votre dossier “Courriers indésirables” si vous
                n’avez pas de réponse sous 24h.
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
