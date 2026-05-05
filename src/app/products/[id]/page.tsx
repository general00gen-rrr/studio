'use client'
import { useState, use, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { categories, formatPrice } from '@/lib/products-dynamic'
import { useCart } from '@/lib/cartStore'
import ProductCard from '@/components/ProductCard'
import ScrollReveal from '@/components/ScrollReveal'

const SORT_OPTIONS = [
  { value: 'default', label: 'Recommandés' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'rating', label: 'Mieux notés' },
]

function CategoryPage({ cat, allProducts }: { cat: string, allProducts: any[] }) {
  const [sort, setSort] = useState('default')
  const [search, setSearch] = useState('')
  const selectedCat = categories.find(c => c.id === cat)
  let filtered = [...allProducts].filter(p => p.category === cat)
  if (search) filtered = filtered.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  )
  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price)
  else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price)
  else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating)
  if (!selectedCat) notFound()
  return (
    <div className="pt-[88px] min-h-screen">
      <div className="relative border-b border-lux-border py-16 overflow-hidden">
        {selectedCat.image && (
          <img src={selectedCat.image} alt={selectedCat.name} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0" style={{background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 100%)'}} />
        <div className="container-lux relative z-10">
          <ScrollReveal direction="up">
            <div className="flex items-center gap-2 mb-3 text-[11px] tracking-[0.25em] uppercase" style={{color:'rgba(255,255,255,0.6)'}}>
              <Link href="/products" className="hover:text-gold transition-colors">Boutique</Link>
              <span>/</span>
              <span style={{color:'rgba(212,175,55,0.9)'}}>{selectedCat.name}</span>
            </div>
            <p className="section-label" style={{color:'rgba(212,175,55,0.9)'}}>{selectedCat.description}</p>
            <h1 className="section-title" style={{color:'white'}}>{selectedCat.name}</h1>
            <div className="gold-divider" />
            <p className="text-sm mt-1" style={{color:'rgba(255,255,255,0.7)'}}>{filtered.length} produit{filtered.length > 1 ? 's' : ''}</p>
          </ScrollReveal>
        </div>
      </div>
      <div className="container-lux py-8">
        <div className="flex flex-wrap gap-3 items-center justify-between mb-8 pb-6 border-b border-lux-border">
          <div className="flex flex-wrap gap-2">
            <Link href="/products" className="px-4 py-2 text-xs tracking-widest uppercase border transition-colors border-lux-border text-lux-gray hover:border-gold hover:text-gold">Tout</Link>
            {categories.map(c => (
              <Link key={c.id} href={`/products/${c.id}`}
                className={`px-4 py-2 text-xs tracking-widest uppercase border transition-colors ${cat === c.id ? 'bg-lux-dark text-white border-lux-dark' : 'border-lux-border text-lux-gray hover:border-gold hover:text-gold'}`}>
                {c.name}
              </Link>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="input-lux w-40 md:w-56 py-2 text-sm" />
            <select value={sort} onChange={e => setSort(e.target.value)} className="input-lux w-auto py-2 text-sm cursor-pointer">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((p, i) => (
              <ScrollReveal key={p.id} direction="up" delay={i * 80}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-lux-gray">Aucun produit trouvé</p>
            <button onClick={() => setSearch('')} className="btn-outline mt-6"><span>Effacer</span></button>
          </div>
        )}
      </div>
    </div>
  )
}

function ImageSlider({ images, name, badge }: { images: string[], name: string, badge?: string }) {
  const [current, setCurrent] = useState(0)

  const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length])

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative bg-[#F5F3F0] overflow-hidden" style={{ aspectRatio: '3/4' }}>
        {images.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <Image src={src} alt={`${name} ${i + 1}`} fill className="object-cover" sizes="50vw" priority={i === 0} />
          </div>
        ))}

        {/* Badge */}
        {badge && (
          <div className="absolute top-5 left-5 z-10">
            <span className="bg-gold text-white text-[9px] tracking-[0.3em] uppercase px-4 py-2 font-medium">{badge}</span>
          </div>
        )}

        {/* Counter */}
        <div className="absolute bottom-5 right-5 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5">
          <span className="text-[10px] tracking-[0.2em] text-lux-dark font-medium">{current + 1} / {images.length}</span>
        </div>

        {/* Arrows — only if more than 1 image */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-gold hover:text-white transition-all duration-200 group"
            >
              <svg className="w-4 h-4 text-lux-dark group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-gold hover:text-white transition-all duration-200 group"
            >
              <svg className="w-4 h-4 text-lux-dark group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative flex-shrink-0 w-16 h-16 overflow-hidden transition-all duration-200 ${
                i === current ? 'ring-2 ring-gold ring-offset-1' : 'opacity-50 hover:opacity-80'
              }`}
            >
              <Image src={src} alt={`${name} ${i + 1}`} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? 'w-5 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-lux-border hover:bg-gold/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ProductDetailPage({ id, allProducts }: { id: string, allProducts: any[] }) {
  const product = allProducts.find((p:any) => p.id === id || p.slug === id)
  if (allProducts.length > 0 && !product) notFound()
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState<'details' | 'livraison'>('details')
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      if (!ctaRef.current) return
      const rect = ctaRef.current.getBoundingClientRect()
      setShowStickyBar(rect.bottom < 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!product) return <div style={{paddingTop:"120px",textAlign:"center"}}>Chargement...</div>
  const images = product.images && product.images.length > 0 ? product.images : product.image ? [product.image] : ["/placeholder.jpg"]

  const related = allProducts.filter((p:any) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="pt-[88px] min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="container-lux py-5 border-b border-lux-border">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-lux-gray/60">
          <Link href="/products" className="hover:text-gold transition-colors">Boutique</Link>
          <span>—</span>
          <Link href={`/products/${product.category}`} className="hover:text-gold transition-colors capitalize">{product.category}</Link>
          <span>—</span>
          <span className="text-lux-dark/70">{product.name}</span>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="container-lux py-10 lg:py-16">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT — Gallery Slider */}
          <ScrollReveal direction="left">
            <ImageSlider images={images} name={product.name} badge={product.badge} />
          </ScrollReveal>

          {/* RIGHT — Product info */}
          <div className="md:sticky md:top-28">

            {/* Category + Title */}
            <ScrollReveal direction="up">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-[1px] bg-gold" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-gold font-medium">{product.category}</span>
              </div>
              <h1 className="font-serif font-normal text-[clamp(28px,3vw,44px)] text-lux-dark leading-[1.1] tracking-[-0.01em]">
                {product.name}
              </h1>
            </ScrollReveal>

            {/* Rating */}
            <ScrollReveal direction="up" delay={60}>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-gold' : 'text-lux-border'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-lux-gray text-xs">{product.rating} — {product.reviews} avis vérifiés</span>
              </div>
            </ScrollReveal>

            <div className="w-full h-[1px] bg-lux-border my-6" />

            {/* Prix */}
            <ScrollReveal direction="up" delay={80}>
              <div className="flex items-baseline gap-4 flex-wrap">
                <span className="font-serif text-[clamp(26px,3vw,36px)] text-lux-dark">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lux-gray/50 line-through text-sm">{formatPrice(product.originalPrice)}</span>
                )}
                {discount && (
                  <span className="text-[10px] tracking-widest uppercase text-gold font-medium bg-gold/10 px-2.5 py-1">
                    −{discount}%
                  </span>
                )}
              </div>
              <p className={`text-[11px] mt-2 tracking-wide flex items-center gap-1.5 ${product.stock <= 5 ? 'text-amber-600' : 'text-green-600'}`}>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                {product.stock > 5 ? `En stock — ${product.stock} disponibles` : `Dernières pièces — ${product.stock} restantes`}
              </p>
            </ScrollReveal>



            {/* Qty + CTA */}
            <ScrollReveal direction="up" delay={120}>
              <div ref={ctaRef} className="mt-7 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-lux-border h-12 flex-shrink-0">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-full flex items-center justify-center text-lux-gray hover:text-gold transition-colors text-lg">−</button>
                    <span className="w-10 h-full flex items-center justify-center text-sm font-medium border-x border-lux-border">{qty}</span>
                    <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="w-10 h-full flex items-center justify-center text-lux-gray hover:text-gold transition-colors text-lg">+</button>
                  </div>
                  <button
                    onClick={handleAdd}
                    className={`flex-1 h-12 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-2 ${added ? 'bg-green-600 text-white' : 'bg-lux-dark text-white hover:bg-gold'}`}
                  >
                    {added ? (
                      <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>Ajouté</>
                    ) : (
                      <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>Ajouter au panier</>
                    )}
                  </button>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => { for (let i = 0; i < qty; i++) addItem(product) }}
                  className="w-full h-12 border border-lux-dark text-lux-dark text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-lux-dark hover:text-white transition-all duration-300 flex items-center justify-center"
                >
                  Commander maintenant
                </Link>
              </div>
            </ScrollReveal>

            {/* Trust badges */}
            <ScrollReveal direction="up" delay={140}>
              <div className="grid grid-cols-3 gap-3 mt-7 pt-6 border-t border-lux-border">
                {[
                  { icon: '🚚', label: 'Livraison 24–48h', sub: 'Partout au Maroc' },
                  { icon: '💳', label: 'Paiement livraison', sub: 'Aucun risque' },
                  { icon: '↩', label: 'Retour 30 jours', sub: 'Remboursé' },
                ].map((b, i) => (
                  <div key={i} className="text-center p-3 bg-cream">
                    <div className="text-lg mb-1">{b.icon}</div>
                    <p className="text-[10px] font-medium text-lux-dark tracking-wide leading-tight">{b.label}</p>
                    <p className="text-[10px] text-lux-gray/60 mt-0.5">{b.sub}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Tabs */}
            <ScrollReveal direction="up" delay={160}>
              <div className="mt-7">
                <div className="flex border-b border-lux-border">
                  {(['details', 'livraison'] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`px-5 py-3 text-[11px] tracking-[0.2em] uppercase font-medium transition-colors border-b-2 -mb-[1px] ${activeTab === tab ? 'border-gold text-gold' : 'border-transparent text-lux-gray hover:text-gold'}`}>
                      {tab === 'details' ? 'Caractéristiques' : 'Livraison'}
                    </button>
                  ))}
                </div>
                <div className="py-5">
                  {activeTab === 'details' ? (
                    <div className="space-y-4">
                      {product.description && (
                        <p className="text-lux-gray text-sm leading-[1.8] font-light border-l-2 border-gold/30 pl-4" style={{whiteSpace:"pre-line"}}>{product.description}</p>
                      )}
                      <ul className="space-y-3 mt-4">
                      {(product.features || []).map((f: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-lux-gray">
                          <div className="w-4 h-4 rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                          </div>
                          {f}
                        </li>
                      ))}
                    </ul>
                    </div>
                  ) : (
                    <div className="space-y-2.5 text-sm text-lux-gray leading-relaxed">
                      <p>✓ Livraison gratuite dès 500 DH partout au Maroc en 24–48h.</p>
                      <p>✓ Paiement à la livraison — payez à la réception.</p>
                      <p>✓ Retour gratuit sous 30 jours.</p>
                      <p>✓ Service client Lun–Sam 9h–18h.</p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>


      {/* STICKY ADD TO CART BAR — via portal to escape transform parents */}
      {isMounted && createPortal(
      <div className={`fixed bottom-0 left-0 right-0 z-[9999] transition-all duration-500 ${showStickyBar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="bg-white border-t border-lux-border shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
          <div className="container-lux py-3 flex items-center gap-4">
            <div className="flex-1 min-w-0 hidden sm:block">
              <p className="font-serif text-lux-dark text-sm truncate leading-tight">{product.name}</p>
              <p className="text-gold font-medium text-sm mt-0.5">{formatPrice(product.price)}</p>
            </div>
            <div className="flex items-center border border-lux-border h-11 flex-shrink-0">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-full flex items-center justify-center text-lux-gray hover:text-gold transition-colors text-lg">−</button>
              <span className="w-9 h-full flex items-center justify-center text-sm font-medium border-x border-lux-border">{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="w-9 h-full flex items-center justify-center text-lux-gray hover:text-gold transition-colors text-lg">+</button>
            </div>
            <button
              onClick={handleAdd}
              className={`h-11 px-5 sm:px-8 text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-300 flex items-center gap-2 flex-shrink-0 ${added ? 'bg-green-600 text-white' : 'bg-lux-dark text-white hover:bg-gold'}`}
            >
              {added ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                  Ajouté
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                  </svg>
                  <span className="hidden sm:inline">Ajouter au panier</span>
                  <span className="sm:hidden">Au panier</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      , document.body)}

      {/* PRODUITS SIMILAIRES */}
      {related.length > 0 && (
        <section className="py-20 bg-[#F9F7F4]">
          <div className="container-lux">
            <ScrollReveal direction="up">
              <div className="flex items-center gap-3 mb-12">
                <div className="w-8 h-[1px] bg-gold" />
                <span className="text-gold text-[11px] tracking-[0.35em] uppercase font-medium">Vous aimerez aussi</span>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p, i) => (
                <ScrollReveal key={p.id} direction="up" delay={i * 80}>
                  <ProductCard product={p} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default function ProductOrCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [allProducts, setAllProducts] = useState<any[]>([])
  useEffect(() => { fetch('/api/products').then(r=>r.json()).then(setAllProducts) }, [])
  if (allProducts.length === 0) return <div style={{paddingTop:'120px',textAlign:'center',color:'#888'}}>Chargement...</div>
  const isCat = categories.some(c => c.id === id)
  return isCat ? <CategoryPage cat={id} allProducts={allProducts} /> : <ProductDetailPage id={id} allProducts={allProducts} />
}
