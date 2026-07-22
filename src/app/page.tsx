import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedAsync, getBestAsync, categories, formatPrice } from '@/lib/products-dynamic'
import ProductCard from '@/components/ProductCard'
import ScrollReveal from '@/components/ScrollReveal'
import Newsletter from '@/components/Newsletter'

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx_oaIfWNQGZdnYkUzYYy3YQAnIFhHacPPS5YJEaTbFA_zwLzjUY-UFlENjGwv2kct8/exec"

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
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 backdrop-blur-md mb-6 animate-fade-in delay-100">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-300 text-xs font-semibold tracking-wide">أكوا كلين • نظافة . جودة . ثقة</span>
            </div>

            <h1 className="animate-fade-up delay-200 font-display font-bold leading-tight">
              <span className="block text-3xl md:text-5xl text-white">مياه نقية وصحية...</span>
              <span className="block text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-sky-200 mt-2">لكل عائلة مغربية</span>
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
            </div>
          </div>
        </div>
      </section>

      {/* BRAND SHOWCASE */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-sky-50/80 via-white to-white border-b border-sky-100">
        <div className="container-lux">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="lg:col-span-7">
              <ScrollReveal direction="left">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-sky-100 bg-white p-2 md:p-4">
                  <img src="/logo-banner.png" alt="AquaClean Official Brand" className="w-full h-auto rounded-2xl object-contain max-h-[500px] mx-auto block" />
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5">
              <ScrollReveal direction="right">
                <h2 className="font-display font-extrabold text-2xl md:text-4xl text-slate-900 leading-tight">
                  نظافة • جودة • ثقة <br /><span className="text-sky-600">لصحة عائلتك يومياً</span>
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mt-4">
                  تعتبر شركة أكوا كلين (AquaClean) الخيار الأول للآلاف من الأسر المغربية. نقدم لك تقنيات التصفية الحديثة بالأسموز العكسي التي تضمن التخلص التام من الكلس.
                </p>
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
              <h2 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900 tracking-tight">أقسام الأنظمة والمنتجات</h2>
            </div>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.id} direction="up" delay={i * 100}>
              <Link href={`/products?cat=${cat.id}`} className="group relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-500 block aspect-[4/3] sm:aspect-[3/4]">
                <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90" sizes="(max-width: 640px) 100vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display font-extrabold text-white text-lg md:text-xl">{cat.name}</h3>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20 bg-slate-50 border-y border-slate-200/60">
        <div className="container-lux">
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
        <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white relative overflow-hidden border-t border-slate-800">
          <div className="container-lux relative z-10">
            <ScrollReveal direction="up">
              <div className="mb-12 text-center max-w-xl mx-auto">
                <span className="text-cyan-400 font-bold text-xs uppercase block mb-2">🔥 الأكثر طلباً بالمغرب</span>
                <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white">أجهزة الفلترة الأكثر مبيعاً</h2>
              </div>
            </ScrollReveal>
            <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
              {best.map((p, i) => (
                <div key={p.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[340px]">
                  <ScrollReveal direction="up" delay={i * 100}>
                    <ProductCard product={p} />
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      <Newsletter scriptUrl={SCRIPT_URL} />

    </div>
  )
}
