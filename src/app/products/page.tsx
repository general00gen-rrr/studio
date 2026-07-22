'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { categories, formatPrice } from '@/lib/products-dynamic'
import ProductCard from '@/components/ProductCard'
import { Suspense } from 'react'

const SORT_OPTIONS = [
  { value: 'default', label: 'الموصى بها' },
  { value: 'price-asc', label: 'السعر: من الأقل للأعلى' },
  { value: 'price-desc', label: 'السعر: من الأعلى للأقل' },
  { value: 'rating', label: 'الأعلى تقييماً' },
]

function ProductsContent() {
  const [products, setProducts] = useState<any[]>([])
  
  useEffect(() => { 
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data)
        }
      })
      .catch(() => {})
  }, [])

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
  else if (sort === 'rating') filtered.sort((a,b) => (b.rating || 0) - (a.rating || 0))

  const selectedCat = categories.find(c => c.id === cat)

  return (
    <div className="pt-[88px] min-h-screen bg-white">
      {/* Hero Header */}
      <div className="relative border-b border-slate-100 py-12 md:py-16 overflow-hidden bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white">
        {selectedCat?.image && (
          <img src={selectedCat.image} alt={selectedCat.name} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
        )}
        <div className="container-lux relative z-10">
          <p className="text-cyan-300 font-bold text-xs uppercase tracking-wider mb-2">
            {selectedCat ? selectedCat.description : 'متجر أجهزة ومصفيات المياه'}
          </p>
          <h1 className="font-display font-bold text-3xl md:text-5xl text-white">
            {selectedCat ? selectedCat.name : 'جميع الأنظمة والأجهزة'}
          </h1>
          <div className="w-12 h-1 bg-cyan-400 rounded-full my-4" />
          <p className="text-sky-100 text-sm font-medium">
            عرض {filtered.length} منتج
          </p>
        </div>
      </div>

      <div className="container-lux py-8">
        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 pb-6 border-b border-slate-100">
          {/* Categories Horizontal Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button 
              onClick={() => { setCat(''); setBadge('') }} 
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${!cat && !badge ? 'bg-sky-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-600'}`}
            >
              الكل
            </button>
            {categories.map(c => (
              <button 
                key={c.id} 
                onClick={() => { setCat(c.id); setBadge('') }} 
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${cat === c.id ? 'bg-sky-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-600'}`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex gap-2 items-center w-full md:w-auto">
            <input 
              type="text" 
              placeholder="بحث عن جهاز أو فلتر..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              className="input-lux flex-1 md:w-60 py-2 text-xs rounded-xl" 
            />
            <select 
              value={sort} 
              onChange={e => setSort(e.target.value)} 
              className="input-lux w-auto py-2 text-xs font-bold rounded-xl cursor-pointer"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-24 bg-sky-50/50 rounded-3xl border border-sky-100 my-6">
            <div className="text-5xl mb-4">💧</div>
            <p className="font-display font-bold text-xl text-slate-800">لم نتمكن من العثور على أي منتج يطابق بحثك</p>
            <p className="text-slate-500 text-xs mt-1">جرب البحث بكلمات أخرى أو اختر قسماً مختلفاً</p>
            <button onClick={() => { setCat(''); setBadge(''); setSearch('') }} className="btn-aqua mt-6 text-xs">
              <span>إعادة ضبط الفلاتر</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="pt-[88px] flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-sky-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
