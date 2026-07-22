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
  { value: 'default', label: 'الموصى بها' },
  { value: 'price-asc', label: 'السعر: من الأقل للأعلى' },
  { value: 'price-desc', label: 'السعر: من الأعلى للأقل' },
  { value: 'rating', label: 'الأعلى تقييماً' },
]

const CATEGORY_MAP: Record<string, string> = {
  maison: 'أنظمة الأسموز العكسي',
  mode: 'فلاتر ومصفيات المياه',
  beaute: 'شمعات وقطع الغيار',
  tech: 'مضخات وإكسسوارات',
}

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
  else if (sort === 'rating') filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  
  if (!selectedCat) notFound()

  return (
    <div className="pt-[88px] min-h-screen bg-white">
      <div className="relative border-b border-slate-100 py-12 md:py-16 overflow-hidden bg-slate-900 text-white">
        {selectedCat.image && (
          <img src={selectedCat.image} alt={selectedCat.name} className="absolute inset-0 w-full h-full object-cover opacity-25" />
        )}
        <div className="container-lux relative z-10">
          <ScrollReveal direction="up">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-sky-400">
              <Link href="/products" className="hover:underline">المتجر</Link>
              <span>/</span>
              <span className="text-white">{selectedCat.name}</span>
            </div>
            <p className="text-cyan-300 font-bold text-xs uppercase tracking-wider mb-1">{selectedCat.description}</p>
            <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white">{selectedCat.name}</h1>
            <div className="w-12 h-1 bg-cyan-400 rounded-full my-4" />
            <p className="text-sky-100 text-sm font-medium">عرض {filtered.length} منتج</p>
          </ScrollReveal>
        </div>
      </div>
      
      <div className="container-lux py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 pb-6 border-b border-slate-100">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Link href="/products" className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-all">الكل</Link>
            {categories.map(c => (
              <Link key={c.id} href={`/products/${c.id}`}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${cat === c.id ? 'bg-sky-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-600'}`}>
                {c.name}
              </Link>
            ))}
          </div>
          <div className="flex gap-2 items-center w-full md:w-auto">
            <input type="text" placeholder="بحث عن منتج..." value={search} onChange={e => setSearch(e.target.value)} className="input-lux flex-1 md:w-56 py-2 text-xs rounded-xl" />
            <select value={sort} onChange={e => setSort(e.target.value)} className="input-lux w-auto py-2 text-xs font-bold rounded-xl cursor-pointer">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((p, i) => (
              <ScrollReveal key={p.id} direction="up" delay={i * 80}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-sky-50/50 rounded-3xl border border-sky-100">
            <p className="font-display font-bold text-xl text-slate-800">لم نتمكن من العثور على أي منتج</p>
            <button onClick={() => setSearch('')} className="btn-aqua mt-6 text-xs"><span>إعادة ضبط البحث</span></button>
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
      <div className="relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 aspect-[4/3] md:aspect-[1/1]">
        {images.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <Image src={src} alt={`${name} ${i + 1}`} fill unoptimized={true} className="object-cover" sizes="50vw" priority={i === 0} />
          </div>
        ))}

        {/* Counter */}
        <div className="absolute bottom-4 right-4 z-10 bg-slate-900/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">
          {current + 1} / {images.length}
        </div>

        {/* Arrows — only if more than 1 image */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-sky-600 hover:text-white transition-all"
            >
              <svg className="w-4 h-4 text-slate-800 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:bg-sky-600 hover:text-white transition-all"
            >
              <svg className="w-4 h-4 text-slate-800 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
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
              className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border transition-all ${
                i === current ? 'border-2 border-sky-600 ring-2 ring-sky-600/20' : 'border-slate-200 opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={src} alt={`${name} ${i + 1}`} fill unoptimized={true} className="object-cover" sizes="64px" />
            </button>
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
  const [activeTab, setActiveTab] = useState<'details' | 'livraison' | 'avis'>('details')
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

  if (!product) return <div className="pt-32 text-center text-slate-500 font-bold">جاري تحميل بيانات المنتج...</div>
  const images = product.images && product.images.length > 0 ? product.images : product.image ? [product.image] : ["/placeholder.jpg"]

  const related = allProducts.filter((p:any) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null
  const catDisplayName = CATEGORY_MAP[product.category] || product.category

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="pt-[88px] min-h-screen bg-white overflow-x-hidden">

      {/* Breadcrumb */}
      <div className="container-lux py-4 border-b border-slate-100">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 flex-wrap">
          <Link href="/products" className="hover:text-sky-600 transition-colors">المتجر</Link>
          <span>—</span>
          <Link href={`/products?cat=${product.category}`} className="hover:text-sky-600 transition-colors">{catDisplayName}</Link>
          <span>—</span>
          <span className="text-slate-900 truncate max-w-[180px]">{product.name}</span>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="container-lux py-8 lg:py-14">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start min-w-0">

          {/* LEFT — Gallery Slider */}
          <ScrollReveal direction="left">
            <ImageSlider images={images} name={product.name} badge={product.badge} />
          </ScrollReveal>

          {/* RIGHT — Product info */}
          <div className="md:sticky md:top-28 min-w-0 overflow-hidden">

            {/* Category + Title */}
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-bold mb-3">
                <span>{catDisplayName}</span>
              </div>
              <h1 className="font-display font-extrabold text-2xl md:text-4xl text-slate-900 leading-tight">
                {product.name}
              </h1>
            </ScrollReveal>

            {/* Rating */}
            <ScrollReveal direction="up" delay={60}>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-slate-500 text-xs font-semibold">{product.rating || '4.9'} — ({product.reviews || 48} تقييم موثق)</span>
              </div>
            </ScrollReveal>

            <div className="w-full h-[1px] bg-slate-100 my-5" />

            {/* Price */}
            <ScrollReveal direction="up" delay={80}>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-display font-extrabold text-3xl md:text-4xl text-sky-600">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-slate-400 line-through text-sm font-semibold">{formatPrice(product.originalPrice)}</span>
                )}
                {discount && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                    خصم −{discount}%
                  </span>
                )}
              </div>
              <p className={`text-xs mt-2 font-bold flex items-center gap-1.5 ${product.stock <= 5 ? 'text-amber-600' : 'text-emerald-600'}`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                {product.stock > 5 ? `متوفر في المخزون — (${product.stock} قطعة متوفرة)` : `الكمية محدودة — متبقي (${product.stock}) قطع فقط`}
              </p>
            </ScrollReveal>

            {/* Quantity + CTA Buttons */}
            <ScrollReveal direction="up" delay={120}>
              <div ref={ctaRef} className="mt-6 space-y-3">
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center border border-slate-200 rounded-xl h-12 flex-shrink-0 bg-slate-50">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-sky-600 font-bold text-lg">−</button>
                    <span className="w-10 h-full flex items-center justify-center text-sm font-bold border-x border-slate-200 text-slate-800">{qty}</span>
                    <button onClick={() => setQty(q => Math.min(product.stock || 20, q + 1))} className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-sky-600 font-bold text-lg">+</button>
                  </div>
                  <button
                    onClick={handleAdd}
                    className={`flex-1 min-w-0 h-12 text-xs font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${added ? 'bg-emerald-600 text-white shadow-md' : 'bg-sky-600 text-white hover:bg-sky-700 shadow-md shadow-sky-600/20'}`}
                  >
                    {added ? (
                      <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>تمت الإضافة للسلة</>
                    ) : (
                      <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>إضافة إلى السلة</>
                    )}
                  </button>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => { for (let i = 0; i < qty; i++) addItem(product) }}
                  className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center shadow-lg"
                >
                  اشتَرِ الآن (الدفع عند الاستلام)
                </Link>
              </div>
            </ScrollReveal>

            {/* Trust badges */}
            <ScrollReveal direction="up" delay={140}>
              <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-100">
                {[
                  { icon: '🚚', label: 'توصيل 24–48h', sub: 'جميع مدن المغرب' },
                  { icon: '💵', label: 'دفع عند الاستلام', sub: 'بعد المعاينة' },
                  { icon: '🛡️', label: 'ضمان وصيانة', sub: 'قطع غيار أصلية' },
                ].map((b, i) => (
                  <div key={i} className="text-center p-3 bg-sky-50/60 rounded-xl border border-sky-100">
                    <div className="text-xl mb-1">{b.icon}</div>
                    <p className="text-xs font-bold text-slate-800 leading-tight">{b.label}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{b.sub}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Tabs */}
            <ScrollReveal direction="up" delay={160}>
              <div className="mt-6">
                <div className="flex border-b border-slate-100 overflow-x-auto">
                  {(['details', 'livraison', 'avis'] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`px-5 py-3 text-xs font-bold transition-colors border-b-2 -mb-[1px] ${activeTab === tab ? 'border-sky-600 text-sky-600' : 'border-transparent text-slate-500 hover:text-sky-600'}`}>
                      {tab === 'details' ? 'المواصفات والخصائص' : tab === 'livraison' ? 'الشحن والتوصيل' : 'تقييمات العملاء'}
                    </button>
                  ))}
                </div>
                <div className="py-4">
                  {activeTab === 'details' ? (
                    <div className="space-y-4">
                      {product.description && (
                        <p className="text-slate-600 text-sm leading-relaxed border-r-2 border-sky-500 pr-3 font-medium">{product.description}</p>
                      )}
                      <ul className="space-y-2 mt-4">
                        {(product.features || []).map((f: string, i: number) => (
                          <li key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                            <span className="text-sky-600 font-bold">✓</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : activeTab === 'livraison' ? (
                    <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed font-semibold">
                      <p>✓ توصيل مجاني لجميع الطلبات بقيمة 500 درهم أو أكثر لكافة مدن المغرب.</p>
                      <p>✓ التسليم خلال 24 إلى 48 ساعة عمل كحد أقصى.</p>
                      <p>✓ الدفع عند الاستلام نقداً بعد معاينة الشحنة والتأكد من سلامتها.</p>
                      <p>✓ ضمان شامل وخدمة ما بعد البيع عبر واتساب والبريد.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {[
                        { name: "أحمد م.", rating: 5, text: "جهاز ممتاز جودة وتنقية رائعة للماء، اختفى طعم الكلس والكلور نهائياً. توصيل سريع وتغليف محكم.", date: "منذ يومين" },
                        { name: "فاطمة الزهراء ك.", rating: 5, text: "تعامل راقي وخدمة ممتازة، تم الاستلام والمعاينة قبل الدفع. ننصح الجميع بهذا المتجر.", date: "منذ أسبوع" },
                        { name: "يوسف ع.", rating: 5, text: "تركيب الفلتر كان سهلاً ونتيجته مبهرة في المطبخ. شكراً فريق أكوا كلين.", date: "منذ أسبوعين" }
                      ].map((r, i) => (
                        <div key={i} className="border border-slate-100 p-3.5 rounded-xl bg-slate-50">
                          <div className="flex items-center justify-between mb-1.5">
                            <p className="text-xs font-bold text-slate-900">{r.name}</p>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, j) => (
                                <svg key={j} className={`w-3 h-3 ${j < r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">"{r.text}"</p>
                          <p className="text-[10px] text-slate-400 mt-2 font-bold">{r.date}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </div>

      {/* STICKY ADD TO CART BAR */}
      {isMounted && createPortal(
        <div className={`fixed bottom-0 left-0 right-0 z-[9999] transition-all duration-300 ${showStickyBar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
          <div className="bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl">
            <div className="container-lux py-3 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0 hidden sm:block">
                <p className="font-bold text-slate-900 text-sm truncate leading-tight">{product.name}</p>
                <p className="text-sky-600 font-bold text-sm mt-0.5">{formatPrice(product.price)}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAdd}
                  className={`h-11 px-6 text-xs font-bold rounded-xl transition-all duration-300 flex items-center gap-2 ${added ? 'bg-emerald-600 text-white' : 'bg-sky-600 text-white hover:bg-sky-700'}`}
                >
                  {added ? '✓ تمت الإضافة' : 'أضف إلى السلة'}
                </button>
              </div>
            </div>
          </div>
        </div>
      , document.body)}

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className="py-16 bg-slate-50 border-t border-slate-100">
          <div className="container-lux">
            <ScrollReveal direction="up">
              <div className="mb-8">
                <span className="text-sky-600 font-bold text-xs uppercase tracking-wider block mb-1">حلول إضافية</span>
                <h2 className="font-display font-bold text-2xl text-slate-900">منتجات وأجهزة مشابهة</h2>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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

  useEffect(() => { 
    fetch('/api/products?t=' + Date.now(), { cache: 'no-store' })
      .then(r => r.json())
      .then(setAllProducts)
      .catch(() => {})
  }, [])

  if (allProducts.length === 0) return <div className="pt-32 text-center text-slate-500 font-bold">جاري تحميل بيانات أجهزة أكوا كلين...</div>
  const isCat = categories.some(c => c.id === id)
  return isCat ? <CategoryPage cat={id} allProducts={allProducts} /> : <ProductDetailPage id={id} allProducts={allProducts} />
}
