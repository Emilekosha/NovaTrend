import React from 'react'
export default function BrandStrip(){
  const logos=[1,2,3,4,5].map(n=>`/assets/sponsor-${n}.png`)
  return (
    <div className="bg-white border-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 place-items-center opacity-80">
        {logos.map((src,i)=>(<img key={i} src={src} alt="" className="h-8 object-contain" />))}
      </div>
    </div>
  )
}

