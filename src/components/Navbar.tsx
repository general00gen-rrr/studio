'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cartStore'
import { useRouter, usePathname } from 'next/navigation'

const links = [
  { href: '/products', label: 'Tous les produits' },
  { href: '/products/maison', label: 'Maison' },
  { href: '/products/mode', label: 'Mode' },
  { href: '/products/beaute', label: 'Beauté' },
  { href: '/products/tech', label: 'Tech' },
]

function LuxeLogo({ transparent }: { transparent: boolean }) {
  const color = transparent ? '#ffffff' : '#C8A96E'
  const opacity = transparent ? 0.9 : 1
  return (
    <svg width="110" height="36" viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left laurel */}
      <g opacity={opacity}>
        <path d="M8 18 Q6 12 11 10 Q12 15 8 18Z" fill={color}/>
        <path d="M9 21 Q5 16 9 13 Q11 17 9 21Z" fill={color} opacity="0.75"/>
        <path d="M11 24 Q7 20 10 17 Q13 20 11 24Z" fill={color} opacity="0.55"/>
        <line x1="8" y1="10" x2="13" y2="26" stroke={color} strokeWidth="0.7" opacity="0.4"/>
      </g>
      {/* Right laurel (mirror) */}
      <g opacity={opacity}>
        <path d="M102 18 Q104 12 99 10 Q98 15 102 18Z" fill={color}/>
        <path d="M101 21 Q105 16 101 13 Q99 17 101 21Z" fill={color} opacity="0.75"/>
        <path d="M99 24 Q103 20 100 17 Q97 20 99 24Z" fill={color} opacity="0.55"/>
        <line x1="102" y1="10" x2="97" y2="26" stroke={color} strokeWidth="0.7" opacity="0.4"/>
      </g>
      {/* LUXÉ text */}
      <text
        x="55"
        y="22"
        textAnchor="middle"
        fontFamily="var(--font-playfair), Georgia, serif"
        fontSize="18"
        fontWeight="600"
        letterSpacing="5"
        fill={color}
      >
        LUXÉ
      </text>
      {/* Bottom thin line */}
      <line x1="22" y1="28" x2="88" y2="28" stroke={color} strokeWidth="0.6" opacity="0.5"/>
      {/* BOUTIQUE PREMIUM subtitle */}
      <text
        x="55"
        y="35"
        textAnchor="middle"
        fontFamily="var(--font-inter), sans-serif"
        fontSize="5.5"
        letterSpacing="3"
        fill={color}
        opacity="0.7"
      >
        BOUTIQUE PREMIUM
      </text>
    </svg>
  )
}

export default function Navbar() {
  const { count, items, removeItem, total, isOpen, toggleCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const isHome = pathname === '/'
  const transparent = isHome && !scrolled

  useEffect(() => {
    setMounted(true)
    const handler = () => setScrolled(window.scrollY > 20)
    handler()
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${transparent ? 'bg-transparent' : 'bg-white shadow-sm'}`}>
        <div className={`text-white text-center py-2 text-xs tracking-widest uppercase transition-all duration-300 ${transparent ? 'bg-black/30 backdrop-blur-sm' : 'bg-lux-dark'}`}>
          🚚 Livraison gratuite au Maroc dès 500 DH — Paiement à la livraison
        </div>
        <nav className="container-lux flex items-center justify-between h-16">
          <Link href="/" className="transition-opacity duration-300 hover:opacity-80">
            <LuxeLogo transparent={transparent} />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.href} href={l.href} className={`text-xs tracking-widest uppercase transition-colors duration-300 font-medium hover:text-gold ${transparent ? 'text-white/80' : 'text-lux-gray'}`}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/products')} className={`hover:text-gold transition-colors hidden md:block ${transparent ? 'text-white/80' : 'text-lux-gray'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
            <button onClick={toggleCart} className={`relative hover:text-gold transition-colors ${transparent ? 'text-white/80' : 'text-lux-gray'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              {mounted && count() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  {count()}
                </span>
              )}
            </button>
            <button className={`md:hidden transition-colors ${transparent ? 'text-white/80' : 'text-lux-gray'}`} onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16"/>}
              </svg>
            </button>
          </div>
        </nav>
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

      {isOpen && (
        <div className="fixed inset-0 z-[100]" onClick={toggleCart}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>
      )}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-lux-border">
          <h2 className="font-serif text-xl">Panier <span className="text-lux-gray text-sm font-sans">({mounted ? count() : 0} articles)</span></h2>
          <button onClick={toggleCart} className="text-lux-gray hover:text-gold transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {!mounted || items.length === 0 ? (
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
        {mounted && items.length > 0 && (
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
