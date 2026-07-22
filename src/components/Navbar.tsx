'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cartStore'
import { useRouter, usePathname } from 'next/navigation'

const links = [
  { href: '/products', label: 'جميع الأجهزة' },
  { href: '/products?cat=maison', label: 'أنظمة التصفية' },
  { href: '/products?cat=tech', label: 'أجهزة الأسموز' },
  { href: '/products?cat=mode', label: 'قطع الغيار' },
  { href: '/contact', label: 'اتصل بنا' },
]

function AquaCleanLogo({ transparent }: { transparent: boolean }) {
  return (
    <div className="flex items-center">
      <img 
        src="/logo-banner.png" 
        alt="AquaClean Logo" 
        className={`h-9 md:h-11 w-auto object-contain transition-transform duration-300 hover:scale-105 ${transparent ? 'brightness-0 invert drop-shadow' : ''}`}
      />
    </div>
  )
}

export default function Navbar() {
  const { count, items, removeItem, total, isOpen, toggleCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const isHome = pathname === '/' || (typeof window !== 'undefined' && window.location.pathname === '/')
  const transparent = mounted ? (isHome && !scrolled) : isHome

  useEffect(() => {
    setMounted(true)
    const handler = () => setScrolled(window.scrollY > 20)
    handler()
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header 
        suppressHydrationWarning
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${transparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-sm'}`}
      >
        <div 
          suppressHydrationWarning
          className={`text-white text-center py-2 text-xs font-semibold tracking-wide transition-all duration-300 ${transparent ? 'bg-slate-900/60 backdrop-blur-md' : 'bg-sky-700'}`}
        >
          🚚 توصيل مجاني لجميع المدن المغربية عند الشراء بـ 500 درهم — الدفع عند الاستلام
        </div>
        <nav className="container-lux flex items-center justify-between h-16">
          <Link href="/" className="transition-opacity duration-300 hover:opacity-90">
            <AquaCleanLogo transparent={transparent} />
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <Link key={l.href} href={l.href} className={`text-xs md:text-sm font-bold transition-colors duration-300 hover:text-cyan-500 ${transparent ? 'text-white/90' : 'text-slate-700'}`}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/products')} className={`hover:text-cyan-500 transition-colors hidden md:block ${transparent ? 'text-white/90' : 'text-slate-700'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
            <button onClick={toggleCart} className={`relative hover:text-cyan-500 transition-colors ${transparent ? 'text-white/90' : 'text-slate-700'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              {mounted && count() > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-cyan-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
                  {count()}
                </span>
              )}
            </button>
            <button className={`md:hidden transition-colors ${transparent ? 'text-white/90' : 'text-slate-700'}`} onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
              </svg>
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 animate-fade-in shadow-xl">
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block px-6 py-3.5 text-sm font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 border-b border-slate-100">
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-[100]" onClick={toggleCart}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
        </div>
      )}
      <div className={`fixed top-0 left-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="font-display font-bold text-lg text-slate-900">سلة الشراء <span className="text-slate-500 text-xs font-sans">({mounted ? count() : 0} منتجات)</span></h2>
          <button onClick={toggleCart} className="text-slate-400 hover:text-slate-600 p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {!mounted || items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">💧</div>
              <p className="font-bold text-slate-800 text-base">سلتك فارغة حالياً</p>
              <p className="text-slate-500 text-xs mt-1">تصفح أحدث أجهزة ومصفيات المياه</p>
              <button onClick={toggleCart} className="btn-aqua mt-6 text-xs"><span>تصفح الأجهزة</span></button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 p-3 bg-slate-50 rounded-xl relative border border-slate-100">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg shrink-0 border border-slate-200" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs text-slate-800 pl-6 truncate">{item.name}</p>
                    <p className="text-sky-600 font-bold text-sm mt-1">{item.price.toLocaleString('ar-MA')} د.م</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">الكمية: {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 left-2 w-6 h-6 flex items-center justify-center rounded-full text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
                    aria-label="حذف"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {mounted && items.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50">
            <div className="flex justify-between mb-3">
              <span className="font-bold text-slate-700 text-sm">المجموع الكلي</span>
              <span className="font-display font-bold text-lg text-sky-600">{total().toLocaleString('ar-MA')} د.م</span>
            </div>
            <p className="text-xs text-emerald-600 mb-4 flex items-center gap-1.5 font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              الدفع نقداً عند الاستلام متاح
            </p>
            <Link href="/checkout" onClick={toggleCart} className="btn-aqua w-full text-center justify-center rounded-xl py-3.5"><span>إتمام الطلب الآن</span></Link>
          </div>
        )}
      </div>
    </>
  )
}
