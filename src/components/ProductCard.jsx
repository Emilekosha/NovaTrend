import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function Stars({ value = 0 }) {
  const full = Math.round(value)
  return (
    <span aria-label={`${value}/5`} className="text-[11px] leading-none select-none">
      <span className="text-amber-500">{'★'.repeat(full)}</span>
      <span className="text-gray-300">{'★'.repeat(5 - full)}</span>
    </span>
  )
}

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const fmt = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

  return (
    <article className="group rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* liseré bleu plein en haut */}
      <div className="h-1 w-full bg-sky-600" />

      {/* IMAGE */}
      <Link
        to={`/product/${product.id}`}
        className="relative block aspect-[4/3] bg-gray-50 overflow-hidden"
        aria-label={`Voir ${product.title}`}
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* BADGE PRIX (orange/jaune plein) */}
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-black shadow">
            {fmt.format(product.price)}
          </span>
        </div>
      </Link>

      {/* CONTENU */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">
            <Link to={`/product/${product.id}`} className="hover:underline">
              {product.title}
            </Link>
          </h3>
          {/* ÉTOILES / NOTE */}
          <div className="flex items-center gap-1">
            <Stars value={product.rating} />
            <span className="text-xs text-gray-500">({product.rating})</span>
          </div>
        </div>

        {/* CATÉGORIE (puce colorée) */}
        <div className="mt-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs text-gray-600 border border-slate-200">
            <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
            {product.category}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => addItem(product)}
            aria-label={`Ajouter ${product.title} au panier`}
            className="flex-1 rounded-2xl bg-sky-600 px-4 py-2 text-white font-medium shadow hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            Ajouter au panier
          </button>

          <Link
            to={`/product/${product.id}`}
            title="Voir le détail"
            aria-label={`Détail de ${product.title}`}
            className="rounded-2xl border border-slate-200 px-3 py-2 text-sky-700 hover:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            →
          </Link>
        </div>
      </div>
    </article>
  )
}
