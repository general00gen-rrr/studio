import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedAsync, getBestAsync, categories, formatPrice } from '@/lib/products-dynamic'
import ProductCard from '@/components/ProductCard'
import ScrollReveal from '@/components/ScrollReveal'

export default async function HomePage() {
  const featured = await getFeaturedAsync()
  const best = await getBestAsync()

  return (
    <div className="pt-0">

      {/* HERO SECTION */}
      <section className="relative min-h-[680px] md:min-h-[760px] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 py-20 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1548839140-29a749e1cf4e?q=80&w=2000&auto=format&fit=crop"
            alt="AquaClean Water Purification"
            fill
            className="object-cover object-center opacity-25 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-sky-950/80 to-transparent" />
        </div>

        <div className="relative z-10 w-full container-lux">
          <div className="max-w-[640px]">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 backdrop-blur-md mb-6 animate-fade-in delay-100">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-300 text-xs font-semibold tracking-wide">أكوا كلين • نظافة . جودة . ثقة</span>
            </div>

            <h1 className="animate-fade-up delay-200 font-display font-bold leading-tight">
              <span className="block text-3xl md:text-5xl text-white">
                مياه نقية وصحية...
              </span>
              <span className="block text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-sky-200 mt-2">
                لكل عائلة مغربية
              </span>
            </h1>

            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full my-6 animate-fade-in delay-300" />

            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-light animate-fade-up delay-300 max-w-[540px]">
              احمِ عائلتك اليوم بأحدث أنظمة تصفية وتنقية المياه المنزلية (الأسموز العكسي RO). مياه عذبة، صحية، وخالية تماماً من الكلس والشوائب مباشرة من صنبورك.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8 animate-fade-up delay-400">
              <Link href="/products" className="group inline-flex items-center gap-3 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white px-8 py-4 text-sm font-bold rounded-xl shadow-lg shadow-sky-500/25 transition-all duration-300 transform hover:-translate-y-0.5">
                <span>تصفح الأجهزة والأنظمة</span>
                <svg className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
              <Link href="/products?badge=nouveau" className="inline-flex items-center gap-2 text-sky-200 hover:text-white text-sm font-medium px-5 py-4 rounded-xl border border-white/10 hover:border-sky-400/50 bg-white/5 backdrop-blur-sm transition-all duration-300">
                أحدث الفلاتر والقطع
              </Link>
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-3 gap-3 mt-10 pt-8 border-t border-white/10 animate-fade-in delay-500">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 text-lg">✓</span>
                <span className="text-slate-300 text-xs md:text-sm font-medium">الدفع عند الاستلام</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 text-lg">✓</span>
                <span className="text-slate-300 text-xs md:text-sm font-medium">توصيل 24–48h بالمغرب</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 text-lg">✓</span>
                <span className="text-slate-300 text-xs md:text-sm font-medium">ضمان وضمان الصيانة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE BANNER */}
      <section className="bg-sky-600 text-white py-3 overflow-hidden shadow-inner">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex shrink-0 gap-10 px-5 text-xs font-semibold tracking-wide">
              <span>💧 مياه نقية وصحية 100%</span>
              <span className="opacity-40">●</span>
              <span>�� توصيل مجاني لجميع مدن المغرب</span>
              <span className="opacity-40">●</span>
              <span>🛡️ ضمان شامل وقطع غيار أصلية</span>
              <span className="opacity-40">●</span>
              <span>💵 الدفع عند الاستلام بعد المعاينة</span>
              <span className="opacity-40">●</span>
            </div>
          ))}
        </div>
      </section>

      {/* VALUE PILLARS */}
      <section className="py-12 bg-sky-50 border-b border-sky-100">
        <div className="container-lux">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-5 rounded-2xl bg-white shadow-sm border border-sky-100 flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-2xl mb-3">💧</div>
              <h4 className="font-bold text-slate-800 text-sm md:text-base">تنقية المياه</h4>
              <p className="text-slate-500 text-xs mt-1">تصفية شاملة من الكلس والشوائب</p>
            </div>
            <div className="p-5 rounded-2xl bg-white shadow-sm border border-sky-100 flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-2xl mb-3">⚙️</div>
              <h4 className="font-bold text-slate-800 text-sm md:text-base">أنظمة أسموز</h4>
              <p className="text-slate-500 text-xs mt-1">تقنيات خماسية وسباعية المراحل</p>
            </div>
            <div className="p-5 rounded-2xl bg-white shadow-sm border border-sky-100 flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-2xl mb-3">🥛</div>
              <h4 className="font-bold text-slate-800 text-sm md:text-base">مياه نقية وصحية</h4>
              <p className="text-slate-500 text-xs mt-1">طعم عذب مع محاذاة المعادن</p>
            </div>
            <div className="p-5 rounded-2xl bg-white shadow-sm border border-sky-100 flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-2xl mb-3">🛡️</div>
              <h4 className="font-bold text-slate-800 text-sm md:text-base">جودة مضمونة</h4>
              <p className="text-slate-500 text-xs mt-1">خدمة بعد البيع وصيانة مستمرة</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 container-lux">
        <ScrollReveal direction="up">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-sky-600 font-bold text-xs tracking-wider uppercase block mb-1">أكوا كلين</span>
              <h2 className="font-display font-bold text-2xl md:text-4xl text-slate-900">اقسام الأنظمة والمنتجات</h2>
            </div>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.id} direction="up" delay={i * 100}>
              <Link href={`/products?cat=${cat.id}`} className="group relative overflow-hidden rounded-2xl bg-slate-100 block shadow-sm border border-slate-100" style={{aspectRatio:'4/3'}}>
                <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-bold text-white text-base md:text-lg">{cat.name}</h3>
                  <div className="flex items-center gap-1.5 mt-2 text-cyan-300 text-xs font-semibold">
                    <span>استكشف المنتجات</span>
                    <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/60">
        <div className="container-lux">
          <ScrollReveal direction="up">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-sky-600 font-bold text-xs tracking-wider uppercase block mb-1">اختيار الخبراء</span>
                <h2 className="font-display font-bold text-2xl md:text-4xl text-slate-900">الأجهزة والأدوات الموصى بها</h2>
              </div>
              <Link href="/products" className="hidden md:flex items-center gap-2 text-sky-600 hover:text-sky-700 font-bold text-sm group">
                <span>عرض الكل</span>
                <svg className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map((p, i) => (
              <ScrollReveal key={p.id} direction="up" delay={i * 80}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      {best.length > 0 && (
        <section className="py-20 bg-slate-900 text-white">
          <div className="container-lux">
            <ScrollReveal direction="up">
              <div className="mb-12 text-center max-w-xl mx-auto">
                <span className="text-cyan-400 font-bold text-xs tracking-wider uppercase block mb-2">الأعلى طلباً</span>
                <h2 className="font-display font-bold text-2xl md:text-4xl">أجهزة الفلترة الأكثر مبيعاً</h2>
                <p className="text-slate-400 text-sm mt-2">حلول جربها واعتمدها مئات العملاء في كافة أرجاء المغرب</p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {best.slice(0,3).map((p, i) => (
                <ScrollReveal key={p.id} direction="up" delay={i * 120}>
                  <Link href={`/products/${p.slug || p.id}`} className="group block bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700/60 hover:border-sky-500 transition-all">
                    <div className="relative overflow-hidden bg-slate-800" style={{aspectRatio:'1/1'}}>
                      <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-all duration-500" sizes="33vw" />
                      <span className="absolute top-3 right-3 bg-sky-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow">الأكثر مبيعاً</span>
                    </div>
                    <div className="p-5">
                      <p className="text-slate-400 text-xs font-medium">{p.category}</p>
                      <h3 className="text-white text-base font-bold mt-1 group-hover:text-cyan-300 transition-colors">{p.name}</h3>
                      <p className="font-display font-bold text-sky-400 mt-2 text-lg">{formatPrice(p.price)}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      <section className="py-20 bg-sky-50">
        <div className="container-lux">
          <ScrollReveal direction="up">
            <div className="max-w-xl mx-auto text-center bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-sky-100">
              <span className="text-sky-600 font-bold text-xs uppercase tracking-wider block mb-2">استشارات ونصائح مجانية</span>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900">تواصل معنا لمعرفة الجهاز الأنسب لمنزلك</h2>
              <p className="text-slate-600 text-sm mt-3 mb-8">أدخل بريدك الإلكتروني ليصلك دليل اختيار أنظمة الفلترة المناسبة لماء منطقتك</p>
              <div className="flex gap-2">
                <input type="email" placeholder="أدخل بريدك الإلكتروني" className="input-lux flex-1 text-sm rounded-xl" />
                <button className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-3.5 text-sm rounded-xl transition-all shrink-0">
                  <span>اشترك الآن</span>
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
