import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
export default function Cart(){
  const { items, cartTotal, updateQty, removeItem } = useCart()
  const navigate = useNavigate()
  const fmt=new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'})
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold mb-6">Votre panier</h1>
      {items.length===0 ? (<div className="text-gray-600">Panier vide. <Link to="/shop" className="underline">Parcourir la boutique</Link></div>) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 border rounded-2xl p-3 bg-white">
                <img src={item.image} alt={item.title} className="h-24 w-28 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium leading-tight truncate">{item.title}</h3>
                  <div className="text-sm text-gray-500">{item.category}</div>
                  <div className="mt-1 font-semibold">{fmt.format(item.price)}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button className="rounded-lg border px-2" onClick={()=>updateQty(item.id, Math.max(0,item.qty-1))}>âˆ’</button>
                    <span className="min-w-[2ch] text-center">{item.qty}</span>
                    <button className="rounded-lg border px-2" onClick={()=>updateQty(item.id, item.qty+1)}>+</button>
                    <button className="ml-auto text-sm text-red-600 hover:underline" onClick={()=>removeItem(item.id)}>Retirer</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="border rounded-2xl p-4 h-fit bg-white">
            <div className="flex items-center justify-between text-lg font-semibold"><span>Total</span><span>{fmt.format(cartTotal)}</span></div>
            <button onClick={()=>navigate('/checkout')} className="mt-3 w-full rounded-2xl bg-black text-white px-4 py-3">Passer au paiement</button>
            <Link to="/shop" className="block mt-2 text-center underline">Continuer vos achats</Link>
          </aside>
        </div>
      )}
    </div>
  )
}

