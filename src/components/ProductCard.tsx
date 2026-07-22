'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product, formatPrice } from '@/lib/products'
import { useCart } from '@/lib/cartStore'

const BADGE_MAP: Record<string, { label: string; style: string }> = {
  nouveau: { label: 'جديد', style: 'bg-sky-600 text-white' },
  bestseller: { label: 'الأكثر مبيعاً', style: 'bg-cyan-500 text-white' },
  promo: { label: 'تخفيض', style: 'bg-red-500 text-white' },
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
    <Link href={`/products/${product.slug || product.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300">
      <div className="relative overflow-hidden bg-slate-50 aspect-[4/3]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full shadow ${BADGE_MAP[product.badge]?.style || 'bg-sky-600 text-white'}`}>
            {BADGE_MAP[product.badge]?.label || product.badge}
          </span>
        )}
        {/* Add to cart overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-2">
          <button
            onClick={handleAdd}
            className={`w-full py-2.5 text-xs font-bold rounded-xl shadow-lg transition-all duration-200 ${added ? 'bg-emerald-600 text-white' : 'bg-sky-600 text-white hover:bg-sky-700'}`}
          >
            {added ? '✓ تم الإضافة إلى السلة' : 'أضف إلى السلة'}
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[11px] font-bold text-sky-600 mb-1">{product.category}</p>
        <h3 className="font-bold text-sm text-slate-800 group-hover:text-sky-600 transition-colors leading-snug line-clamp-1">{product.name}</h3>
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
          <span className="font-display font-bold text-base text-slate-900">{formatPrice(product.price)}</span>
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <span className="text-[11px] font-semibold text-slate-500">{product.rating || '4.9'} ({product.reviews || '12'})</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
