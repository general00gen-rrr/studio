'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { categories, formatPrice } from '@/lib/products-dynamic'
import ProductCard from '@/components/ProductCard'
import { Suspense } from 'react'

const SORT_OPTIONS = [
  { value: 'default', label: 'Recommandés' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'rating', label: 'Mieux notés' },
]

function ProductsContent() {
  const [products, setProducts] = useState<any[]>([])
  useEffect(() => { fetch('/api/products').then(r=>r.json()).then(setProducts) }, [])
  const searchParams = useSearchParams()
  const [cat, setCat] = useState(searchParams.get('cat') || '')
  const [badge, setBadge] = useState(searchParams.get('badge') || '')
  const [sort, setSort] = useState('default')
  const [search, setSearch] = useState('')

  useEffect(() => {
    setCat(searchParams.get('cat') || '')
    setBadge(searchParams.get('badge') || '')
  }, [searchParams])

  let filtered = [...products]
  if (cat) filtered = filtered.filter(p => p.category === cat)
  if (badge) filtered = filtered.filter(p => p.badge === badge)
  if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
  if (sort === 'price-asc') filtered.sort((a,b) => a.price - b.price)
  else if (sort === 'price-desc') filtered.sort((a,b) => b.price - a.price)
  else if (sort === 'rating') filtered.sort((a,b) => b.rating - a.rating)

  const selectedCat = categories.find(c => c.id === cat)

  return (
    <div className="pt-[88px] min-h-screen">
      {/* Hero bar */}
      <div className="relative border-b border-lux-border py-16 overflow-hidden">
        {selectedCat?.image && (
          <img src={selectedCat.image} alt={selectedCat.name} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0" style={{background: selectedCat?.image ? 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 100%)' : 'transparent', backgroundColor: selectedCat?.image ? undefined : 'var(--cream)'}} />
        <div className="container-lux relative z-10">
          <p className="section-label" style={{color: selectedCat?.image ? 'rgba(212,175,55,0.9)' : undefined}}>{selectedCat ? selectedCat.description : 'Toute la boutique'}</p>
          <h1 className="section-title" style={{color: selectedCat?.image ? 'white' : undefined}}>{selectedCat ? selectedCat.name : 'Nos Produits'}</h1>
          <div className="gold-divider" />
          <p className="text-sm mt-1" style={{color: selectedCat?.image ? 'rgba(255,255,255,0.7)' : 'var(--lux-gray)'}}>{filtered.length} produit{filtered.length > 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="container-lux py-8">
        {/* Filters bar */}
        <div className="flex flex-wrap gap-3 items-center justify-between mb-8 pb-6 border-b border-lux-border">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setCat(''); setBadge('') }} className={`px-4 py-2 text-xs tracking-widest uppercase border transition-colors ${!cat && !badge ? 'bg-lux-dark text-white border-lux-dark' : 'border-lux-border text-lux-gray hover:border-gold hover:text-gold'}`}>
              Tout
            </button>
            {categories.map(c => (
              <button key={c.id} onClick={() => { setCat(c.id); setBadge('') }} className={`px-4 py-2 text-xs tracking-widest uppercase border transition-colors ${cat === c.id ? 'bg-lux-dark text-white border-lux-dark' : 'border-lux-border text-lux-gray hover:border-gold hover:text-gold'}`}>
                {c.name}
              </button>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="input-lux w-40 md:w-56 py-2 text-sm" />
            <select value={sort} onChange={e => setSort(e.target.value)} className="input-lux w-auto py-2 text-sm cursor-pointer">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-lux-gray">Aucun produit trouvé</p>
            <button onClick={() => { setCat(''); setBadge(''); setSearch('') }} className="btn-outline mt-6"><span>Effacer les filtres</span></button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return <Suspense fallback={<div className="pt-[88px] flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"/></div>}><ProductsContent /></Suspense>
}
