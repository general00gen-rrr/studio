'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product, formatPrice } from '@/lib/products'
import { useCart } from '@/lib/cartStore'

const BADGE_MAP: Record<string, { label: string; style: string }> = {
  nouveau: { label: 'Nouveau', style: 'bg-lux-dark text-white' },
  bestseller: { label: 'Best-seller', style: 'bg-gold text-white' },
  promo: { label: 'Promo', style: 'bg-red-500 text-white' },
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <Link href={`/products/${product.slug || product.id}`} className="group block">
      <div className="relative overflow-hidden bg-cream aspect-[3/4]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[10px] tracking-widest uppercase px-2 py-1 font-medium ${BADGE_MAP[product.badge].style}`}>
            {BADGE_MAP[product.badge].label}
          </span>
        )}
        {/* Add to cart overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAdd}
            className={`w-full py-3 text-xs tracking-widest uppercase font-medium transition-all duration-200 ${added ? 'bg-green-600 text-white' : 'bg-lux-dark text-white hover:bg-gold'}`}
          >
            {added ? '✓ Ajouté au panier' : 'Ajouter au panier'}
          </button>
        </div>
        {/* Favorite */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold hover:text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
        </button>
      </div>
      <div className="pt-3 pb-1">
        <p className="text-[10px] tracking-widest uppercase text-lux-gray mb-1">{product.category}</p>
        <h3 className="font-medium text-sm text-lux-dark group-hover:text-gold transition-colors leading-tight">{product.name}</h3>
        <div className="flex items-center justify-between mt-1.5">
          <span className="font-serif text-base font-medium">{formatPrice(product.price)}</span>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-gold fill-gold" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <span className="text-[10px] text-lux-gray">{product.rating} ({product.reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
