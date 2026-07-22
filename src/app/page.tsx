import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedAsync, getBestAsync, categories, formatPrice } from '@/lib/products-dynamic'
import ProductCard from '@/components/ProductCard'
import ScrollReveal from '@/components/ScrollReveal'

export default async function HomePage() {
  const featured = await getFeaturedAsync()
  const best = await getBestAsync()

  return (
    <div className="pt-0 bg-white">

      {/* HERO SECTION */}
      <section className="relative min-h-[680px] md:min-h-[760px] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 py-20 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://i.ibb.co/hRG56rnd/Crystal-clear-water-splash-wave-202607221823-1.jpg"
            alt="AquaClean Water Purification"
            fill
            unoptimized={true}
            className="object-cover object-center opacity-40 mix-blend-overlay"
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
              <span>🚚 توصيل مجاني لجميع مدن المغرب</span>
              <span className="opacity-40">●</span>
              <span>🛡️ ضمان شامل وقطع غيار أصلية</span>
              <span className="opacity-40">●</span>
              <span>💵 الدفع عند الاستلام بعد المعاينة</span>
              <span className="opacity-40">●</span>
            </div>
          ))}
        </div>
      </section>

      {/* BRAND SHOWCASE SECTION (قسم الشعار الرسمي والأجهزة) */}
      <section className="py-20 bg-gradient-to-b from-sky-50/60 to-white border-b border-sky-100">
        <div className="container-lux">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Image Banner Container */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="left">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white p-3 md:p-5 transition-transform duration-500 hover:scale-[1.01]">
                  <Image 
                    src="https://i.ibb.co/3ykXqXz/aquaclean-official-banner.png" 
                    alt="AquaClean Official Brand" 
                    width={1000} 
                    height={650} 
                    unoptimized={true}
                    className="w-full h-auto rounded-2xl object-cover"
                  />
                  <div className="absolute top-6 right-6 bg-sky-600/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
                    ★ علامة تجارية معتمدة بالمغرب
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Brand Content */}
            <div className="lg:col-span-5">
              <ScrollReveal direction="right">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold mb-4">
                  <span>لماذا تختار أكوا كلين؟</span>
                </div>
                <h2 className="font-display font-extrabold text-2xl md:text-4xl text-slate-900 leading-tight">
                  نظافة • جودة • ثقة <br />
                  <span className="text-sky-600">لصحة عائلتك يومياً</span>
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mt-4">
                  تعتبر شركة أكوا كلين (AquaClean) الخيار الأول للآلاف من الأسر المغربية. نقدم لك تقنيات التصفية الحديثة بالأسموز العكسي التي تضمن التخلص التام من الكلس، الأملاح الثقيلة والترسبات.
                </p>

                {/* 4 Value Badges */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="p-3.5 bg-white rounded-2xl border border-sky-100 shadow-sm flex items-center gap-3">
                    <span className="text-2xl">💧</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs">تنقية المياه</h4>
                      <p className="text-slate-500 text-[10px]">تصفية 100%</p>
                    </div>
                  </div>
                  <div className="p-3.5 bg-white rounded-2xl border border-sky-100 shadow-sm flex items-center gap-3">
                    <span className="text-2xl">⚙️</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs">أنظمة أسموز</h4>
                      <p className="text-slate-500 text-[10px]">تقنية خماسية وسباعية</p>
                    </div>
                  </div>
                  <div className="p-3.5 bg-white rounded-2xl border border-sky-100 shadow-sm flex items-center gap-3">
                    <span className="text-2xl">🥛</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs">مياه نقية وصحية</h4>
                      <p className="text-slate-500 text-[10px]">معززة بالمعادن</p>
                    </div>
                  </div>
                  <div className="p-3.5 bg-white rounded-2xl border border-sky-100 shadow-sm flex items-center gap-3">
                    <span className="text-2xl">🛡️</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs">جودة مضمونة</h4>
                      <p className="text-slate-500 text-[10px]">ضمان وصيانة مستمرة</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/products" className="btn-aqua inline-flex items-center gap-2">
                    <span>اكتشف جميع الأجهزة</span>
                    <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </Link>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-24 container-lux">
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-xs font-bold mb-3">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                <span>أكوا كلين • حلول تصفية المياه</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight">
                أقسام الأنظمة والمنتجات
              </h2>
            </div>
            <p className="text-slate-500 text-sm max-w-md">
              اختر الفئة المناسبة لاحتياجات منزلك لتصفح أحدث أجهزة ومصفيات المياه وقطع الغيار
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.id} direction="up" delay={i * 100}>
              <Link 
                href={`/products?cat=${cat.id}`} 
                className="group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-200/80 shadow-sm hover:shadow-2xl hover:border-sky-400/50 transition-all duration-500 block aspect-[4/3] sm:aspect-[3/4]"
              >
                <Image 
                  src={cat.image} 
                  alt={cat.name} 
                  fill 
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-85 transition-opacity" />
                <div className="absolute inset-0 bg-sky-950/20 group-hover:bg-transparent transition-colors" />

                <span className="absolute top-4 right-4 px-3 py-1 text-[11px] font-bold text-sky-200 bg-slate-950/60 backdrop-blur-md rounded-full border border-white/10 shadow-sm">
                  {cat.count ? `${cat.count} منتجات` : 'أكوا كلين'}
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                  <h3 className="font-display font-extrabold text-white text-lg md:text-xl leading-snug group-hover:text-cyan-300 transition-colors">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="text-slate-300 text-xs mt-1.5 line-clamp-1 font-medium opacity-90">
                      {cat.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-4 text-cyan-400 text-xs font-bold group-hover:text-white transition-colors">
                    <span>استكشف المنتجات</span>
                    <svg className="w-4 h-4 rotate-180 transform group-hover:-translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
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
