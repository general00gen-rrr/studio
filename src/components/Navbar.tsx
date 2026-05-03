'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cartStore'
import { useRouter } from 'next/navigation'

const links = [
  { href: '/products', label: 'Tous les produits' },
  { href: '/products?cat=maison', label: 'Maison' },
  { href: '/products?cat=mode', label: 'Mode' },
  { href: '/products?cat=beaute', label: 'Beauté' },
  { href: '/products?cat=tech', label: 'Tech' },
]

export default function Navbar() {
  const { count, items, removeItem, total, isOpen, toggleCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm' : 'bg-white/95 backdrop-blur-sm'}`}>
        {/* Top bar */}
        <div className="bg-lux-dark text-white text-center py-2 text-xs tracking-widest uppercase">
          🚚 Livraison gratuite au Maroc dès 500 DH — Paiement à la livraison
        </div>
        {/* Main nav */}
        <nav className="container-lux flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-semibold tracking-widest text-lux-dark">
            LUXÉ
          </Link>
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="text-xs tracking-widest uppercase text-lux-gray hover:text-gold transition-colors font-medium">
                {l.label}
              </Link>
            ))}
          </div>
          {/* Actions */}
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/products')} className="text-lux-gray hover:text-gold transition-colors hidden md:block">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
            <button onClick={toggleCart} className="relative text-lux-gray hover:text-gold transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              {count() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  {count()}
                </span>
              )}
            </button>
            <button className="md:hidden text-lux-gray" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16"/>}
              </svg>
            </button>
          </div>
        </nav>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-lux-border animate-fade-in">
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block px-6 py-4 text-xs tracking-widest uppercase text-lux-gray hover:text-gold border-b border-lux-border">
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100]" onClick={toggleCart}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>
      )}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-lux-border">
          <h2 className="font-serif text-xl">Panier <span className="text-lux-gray text-sm font-sans">({count()} articles)</span></h2>
          <button onClick={toggleCart} className="text-lux-gray hover:text-gold transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🛍️</div>
              <p className="text-lux-gray font-serif text-lg">Votre panier est vide</p>
              <p className="text-lux-gray text-sm mt-2">Découvrez nos produits premium</p>
              <button onClick={toggleCart} className="btn-gold mt-6"><span>Explorer</span></button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 p-4 bg-cream rounded">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-gold font-medium text-sm mt-1">{item.price.toLocaleString('fr-MA')} DH</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => removeItem(item.id)} className="text-xs text-lux-gray hover:text-red-500 transition-colors">Supprimer</button>
                      <span className="text-lux-border">|</span>
                      <span className="text-xs text-lux-gray">Qté: {item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="p-6 border-t border-lux-border">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total</span>
              <span className="font-serif text-xl font-semibold">{total().toLocaleString('fr-MA')} DH</span>
            </div>
            <p className="text-xs text-green-600 mb-4 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              Paiement à la livraison disponible
            </p>
            <Link href="/checkout" onClick={toggleCart} className="btn-gold w-full text-center justify-center"><span>Commander maintenant</span></Link>
          </div>
        )}
      </div>
    </>
  )
}
