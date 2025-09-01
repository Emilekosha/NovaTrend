import React from 'react'
import ProductCard from './ProductCard.jsx'
import { products, categories } from '../data/products.js'
export default function ProductList({limit}){
  const [query,setQuery]=React.useState('')
  const [category,setCategory]=React.useState('Tous')
  const [sort,setSort]=React.useState('pertinence')
  const list=React.useMemo(()=>{ let list=products.filter(p=>p.title.toLowerCase().includes(query.trim().toLowerCase())); if(category!=='Tous') list=list.filter(p=>p.category===category); switch(sort){case 'prix-asc': list=[...list].sort((a,b)=>a.price-b.price); break; case 'prix-desc': list=[...list].sort((a,b)=>b.price-a.price); break; case 'rating': list=[...list].sort((a,b)=>b.rating-a.rating); break; default: break;} if(limit) list=list.slice(0,limit); return list },[query,category,sort,limit])
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row gap-3 items-center mb-6">
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Rechercher des produitsâ€¦" className="w-full rounded-2xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"/>
        <select value={category} onChange={e=>setCategory(e.target.value)} className="rounded-2xl border px-3 py-2" aria-label="CatÃ©gorie">
          {categories.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={e=>setSort(e.target.value)} className="rounded-2xl border px-3 py-2" aria-label="Tri">
          <option value="pertinence">Pertinence</option>
          <option value="prix-asc">Prix â†‘</option>
          <option value="prix-desc">Prix â†“</option>
          <option value="rating">Meilleures notes</option>
        </select>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {list.map(p=> <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}

