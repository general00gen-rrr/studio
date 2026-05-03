'use client'
import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getById, products, formatPrice } from '@/lib/products'
import { useCart } from '@/lib/cartStore'
import ProductCard from '@/components/ProductCard'

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = getById(id)
  
  if (!product) notFound()

  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="pt-[88px]">
      {/* Breadcrumb */}
      <div className="container-lux py-4 border-b border-lux-border">
        <div className="flex items-center gap-2 text-xs text-lux-gray">
          <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gold transition-colors">Produits</Link>
          <span>/</span>
          <Link href={`/products?cat=${product.category}`} className="hover:text-gold transition-colors capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-lux-dark">{product.name}</span>
        </div>
      </div>

      <div className="container-lux py-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="relative aspect-square bg-cream overflow-hidden">
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="50vw" priority />
            {product.badge && (
              <span className={`absolute top-4 left-4 text-xs tracking-widest uppercase px-3 py-1.5 font-medium ${product.badge === 'bestseller' ? 'bg-gold text-white' : 'bg-lux-dark text-white'}`}>
                {product.badge === 'bestseller' ? 'Best-seller' : product.badge === 'nouveau' ? 'Nouveau' : 'Promo'}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-start py-4">
            <p className="section-label capitalize">{product.category}</p>
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-lux-dark mt-1">{product.name}</h1>
            <div className="gold-divider mt-3 mb-4" />

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} className={`w-4 h-4 ${s <= Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-lux-border fill-lux-border'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <span className="text-sm text-lux-gray">{product.rating} ({product.reviews} avis)</span>
            </div>

            <p className="font-serif text-4xl font-medium text-gold mb-2">{formatPrice(product.price)}</p>
            <p className="text-xs text-green-600 mb-6 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              En stock ({product.stock} disponibles)
            </p>

            <p className="text-lux-gray text-sm leading-relaxed mb-6">{product.details}</p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {product.features.map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-lux-gray">
                  <span className="w-1 h-1 bg-gold rounded-full shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-lux-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-lux-gray hover:text-gold transition-colors">−</button>
                <span className="w-10 text-center font-medium">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="w-10 h-10 flex items-center justify-center text-lux-gray hover:text-gold transition-colors">+</button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <button onClick={handleAdd} className={`btn-gold flex-1 justify-center ${added ? '!bg-green-600' : ''}`}>
                <span>{added ? '✓ Ajouté au panier !' : 'Ajouter au panier'}</span>
              </button>
              <Link href="/checkout" onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })} className="btn-outline px-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </Link>
            </div>

            {/* Reassurance */}
            <div className="mt-6 pt-6 border-t border-lux-border space-y-3">
              {[
                ['🚚', 'Livraison 24-48h dans tout le Maroc'],
                ['💳', 'Paiement à la livraison disponible'],
                ['↩️', 'Retour gratuit sous 30 jours'],
                ['🔒', 'Produit authentique garanti'],
              ].map(([icon, text]) => (
                <p key={text as string} className="text-xs text-lux-gray flex items-center gap-2">
                  <span>{icon}</span> {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-cream">
          <div className="container-lux">
            <h2 className="section-title mb-8">Vous aimerez aussi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
