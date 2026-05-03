'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cartStore'
import { formatPrice } from '@/lib/products'

export default function CartPage() {
  const { items, removeItem, updateQty, total, count } = useCart()

  if (items.length === 0) return (
    <div className="pt-[88px] min-h-screen flex items-center justify-center">
      <div className="text-center py-20">
        <div className="text-7xl mb-6">🛒</div>
        <h1 className="font-serif text-3xl mb-3">Votre panier est vide</h1>
        <p className="text-lux-gray mb-8">Découvrez notre sélection premium</p>
        <Link href="/products" className="btn-gold"><span>Continuer mes achats</span></Link>
      </div>
    </div>
  )

  return (
    <div className="pt-[88px] min-h-screen">
      <div className="bg-cream border-b border-lux-border py-10">
        <div className="container-lux">
          <h1 className="section-title">Mon Panier</h1>
          <div className="gold-divider" />
          <p className="text-lux-gray text-sm">{count()} article{count() > 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="container-lux py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex gap-5 p-5 bg-cream border border-lux-border hover:border-gold transition-colors">
                <div className="relative w-24 h-24 shrink-0 overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gold font-serif font-medium mt-1">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center border border-lux-border">
                      <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-lux-gray hover:text-gold">−</button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-lux-gray hover:text-gold">+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-xs text-lux-gray hover:text-red-500 transition-colors">Supprimer</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-serif font-medium">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-cream border border-lux-border p-6 sticky top-24">
              <h2 className="font-serif text-xl mb-4">Récapitulatif</h2>
              <div className="space-y-3 mb-4 pb-4 border-b border-lux-border">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-lux-gray truncate max-w-[160px]">{item.name} ×{item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-lux-gray">Livraison</span>
                <span className="text-green-600 font-medium">{total() >= 500 ? 'Gratuite' : '50 DH'}</span>
              </div>
              {total() < 500 && <p className="text-xs text-lux-gray mb-3">Plus que {formatPrice(500 - total())} pour la livraison gratuite</p>}
              <div className="flex justify-between font-medium text-lg pt-3 border-t border-lux-border mt-3">
                <span>Total</span>
                <span className="font-serif">{formatPrice(total() >= 500 ? total() : total() + 50)}</span>
              </div>
              <div className="mt-5 p-3 bg-green-50 border border-green-200 text-xs text-green-700 flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                Paiement à la livraison disponible
              </div>
              <Link href="/checkout" className="btn-gold w-full text-center justify-center mt-4"><span>Commander — Payer à la livraison</span></Link>
              <Link href="/products" className="block text-center mt-3 text-xs text-lux-gray hover:text-gold transition-colors">← Continuer mes achats</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
