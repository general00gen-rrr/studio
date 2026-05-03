'use client'
import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getById, products, categories, formatPrice } from '@/lib/products'
import { useCart } from '@/lib/cartStore'
import ProductCard from '@/components/ProductCard'
import ScrollReveal from '@/components/ScrollReveal'

const SORT_OPTIONS = [
  { value: 'default', label: 'Recommandés' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'rating', label: 'Mieux notés' },
]

function CategoryPage({ cat }: { cat: string }) {
  const [sort, setSort] = useState('default')
  const [search, setSearch] = useState('')
  const selectedCat = categories.find(c => c.id === cat)

  let filtered = [...products].filter(p => p.category === cat)
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
      <div className="bg-cream border-b border-lux-border py-10">
        <div className="container-lux">
          <ScrollReveal direction="up">
            <div className="flex items-center gap-2 mb-3 text-[11px] tracking-[0.25em] uppercase text-lux-gray">
              <Link href="/products" className="hover:text-gold transition-colors">Boutique</Link>
              <span>/</span>
              <span className="text-gold">{selectedCat.name}</span>
            </div>
            <p className="section-label">{selectedCat.description}</p>
            <h1 className="section-title">{selectedCat.name}</h1>
            <div className="gold-divider" />
            <p className="text-lux-gray text-sm mt-1">{filtered.length} produit{filtered.length > 1 ? 's' : ''}</p>
          </ScrollReveal>
        </div>
      </div>
      <div className="container-lux py-8">
        <div className="flex flex-wrap gap-3 items-center justify-between mb-8 pb-6 border-b border-lux-border">
          <div className="flex flex-wrap gap-2">
            <Link href="/products" className="px-4 py-2 text-xs tracking-widest uppercase border transition-colors border-lux-border text-lux-gray hover:border-gold hover:text-gold">
              Tout
            </Link>
            {categories.map(c => (
              <Link key={c.id} href={`/products/${c.id}`}
                className={`px-4 py-2 text-xs tracking-widest uppercase border transition-colors ${
                  cat === c.id ? 'bg-lux-dark text-white border-lux-dark' : 'border-lux-border text-lux-gray hover:border-gold hover:text-gold'
                }`}>
                {c.name}
              </Link>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            <input type="text" placeholder="Rechercher..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-lux w-40 md:w-56 py-2 text-sm" />
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="input-lux w-auto py-2 text-sm cursor-pointer">
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

function ProductDetailPage({ id }: { id: string }) {
  const product = getById(id)
  if (!product) notFound()
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="pt-[88px] min-h-screen">
      <div className="container-lux py-8">
        <ScrollReveal direction="up">
          <div className="flex items-center gap-2 mb-8 text-[11px] tracking-[0.25em] uppercase text-lux-gray">
            <Link href="/products" className="hover:text-gold transition-colors">Boutique</Link>
            <span>/</span>
            <Link href={`/products/${product.category}`} className="hover:text-gold transition-colors capitalize">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gold">{product.name}</span>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <ScrollReveal direction="left">
            <div className="relative aspect-square bg-cream overflow-hidden">
              <Image src={product.image} alt={product.name} fill className="object-cover" sizes="50vw" />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-gold text-white text-[9px] tracking-[0.25em] uppercase px-3 py-1.5">
                  {product.badge}
                </span>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="flex flex-col justify-center">
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold font-medium mb-3">{product.category}</p>
              <h1 className="font-sans font-light text-[clamp(28px,3.5vw,42px)] text-lux-dark tracking-[-0.02em] leading-tight">{product.name}</h1>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-gold' : 'text-lux-border'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-lux-gray text-xs">{product.rating} ({product.reviews} avis)</span>
              </div>
              <div className="flex items-baseline gap-3 mt-6">
                <span className="font-serif text-3xl text-lux-dark">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lux-gray line-through text-sm">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              <p className="text-lux-gray text-sm leading-relaxed mt-6">{product.details}</p>
              <ul className="mt-6 space-y-2">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-lux-gray">
                    <div className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4 mt-8">
                <div className="flex items-center border border-lux-border">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 text-lux-gray hover:text-gold transition-colors">−</button>
                  <span className="px-4 py-2 text-sm font-medium border-x border-lux-border min-w-[40px] text-center">{qty}</span>
                  <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="px-3 py-2 text-lux-gray hover:text-gold transition-colors">+</button>
                </div>
                <button onClick={handleAdd} className="btn-gold flex-1 justify-center">
                  <span>{added ? '✓ Ajouté au panier' : 'Ajouter au panier'}</span>
                </button>
              </div>
              <p className="text-[11px] text-lux-gray mt-4 tracking-wide">
                {product.stock > 5 ? `✓ En stock (${product.stock} disponibles)` : `⚠ Plus que ${product.stock} en stock`}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <ScrollReveal direction="up">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-6 h-[1px] bg-gold" />
                <span className="text-gold text-[11px] tracking-[0.3em] uppercase font-medium">Vous aimerez aussi</span>
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
        )}
      </div>
    </div>
  )
}

export default function ProductOrCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const isCat = categories.some(c => c.id === id)
  return isCat ? <CategoryPage cat={id} /> : <ProductDetailPage id={id} />
}
