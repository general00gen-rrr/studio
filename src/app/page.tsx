import Link from 'next/link'
import Image from 'next/image'
import { getFeatured, categories, getBest, formatPrice } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

export default function HomePage() {
  const featured = getFeatured()
  const best = getBest()

  return (
    <div className="pt-0">

      {/* HERO */}
      <section className="relative h-screen min-h-[700px] max-h-[960px] flex items-end overflow-hidden bg-lux-dark">

        {/* صورة الخلفية */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1800&q=85"
            alt="Hero"
            fill
            className="object-cover object-right opacity-75"
            priority
          />
        </div>

        {/* Overlay متدرج من اليسار للشفافية */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/70 to-transparent" />
        {/* Overlay من الأسفل */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/60 via-transparent to-transparent" />

        {/* المحتوى — أسفل اليسار */}
        <div className="relative z-10 w-full container-lux pb-20 md:pb-28">
          <div className="max-w-[520px]">

            {/* Label */}
            <div className="flex items-center gap-3 mb-6 animate-fade-in delay-100">
              <div className="w-8 h-[1px] bg-gold" />
              <span className="text-gold text-[11px] tracking-[0.35em] uppercase font-medium">Collection 2024</span>
            </div>

            {/* العنوان */}
            <h1 className="animate-fade-up delay-200">
              <span className="block font-sans font-light text-[clamp(48px,7vw,88px)] text-white leading-[0.95] tracking-[-0.02em]">
                L'Art
              </span>
              <span className="block font-serif italic text-[clamp(52px,7.5vw,96px)] text-gold leading-[0.95] tracking-[-0.01em] mt-1">
                du Quotidien
              </span>
            </h1>

            {/* خط فاصل */}
            <div className="w-10 h-[1px] bg-gold/50 my-7 animate-fade-in delay-300" />

            {/* الوصف */}
            <p className="text-white/60 text-[15px] leading-[1.7] font-light animate-fade-up delay-300 max-w-[380px]">
              Une sélection raffinée de produits premium pour sublimer votre quotidien.
              Livraison partout au Maroc.
            </p>

            {/* الأزرار */}
            <div className="flex flex-wrap items-center gap-4 mt-10 animate-fade-up delay-400">
              <Link href="/products" className="group relative inline-flex items-center gap-3 bg-gold text-white px-8 py-4 text-[12px] tracking-[0.2em] uppercase font-medium overflow-hidden transition-all duration-300 hover:bg-white hover:text-lux-dark">
                <span>Découvrir</span>
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
              <Link href="/products?badge=nouveau" className="inline-flex items-center gap-2 text-white/70 text-[12px] tracking-[0.2em] uppercase font-medium hover:text-gold transition-colors duration-300 border-b border-white/20 hover:border-gold pb-0.5">
                Nouveautés
              </Link>
            </div>

            {/* الضمانات */}
            <div className="flex items-center gap-6 mt-12 animate-fade-in delay-500">
              {['Paiement livraison', 'Livraison 24–48h', 'Retour gratuit'].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gold/60" />
                  <span className="text-white/35 text-[10px] tracking-widest uppercase">{item}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* رقم الصفحة / scroll */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-3 hidden md:flex">
          <span className="text-white/20 text-[10px] tracking-[0.4em] uppercase" style={{writingMode:'vertical-rl'}}>Défiler</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </div>

      </section>

      {/* MARQUEE */}
      <section className="bg-lux-dark border-y border-gold/15 py-[14px] overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex shrink-0 gap-10 px-5 text-gold/50 text-[10px] tracking-[0.35em] uppercase font-medium">
              <span>Livraison Rapide 24–48h</span>
              <span className="text-gold/20">◆</span>
              <span>Paiement à la Livraison</span>
              <span className="text-gold/20">◆</span>
              <span>Retour Gratuit 30 Jours</span>
              <span className="text-gold/20">◆</span>
              <span>Produits Premium Sélectionnés</span>
              <span className="text-gold/20">◆</span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-24 container-lux">
        <div className="flex items-end justify-between mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-[1px] bg-gold" />
              <span className="text-gold text-[11px] tracking-[0.3em] uppercase font-medium">Explorer</span>
            </div>
            <h2 className="font-sans font-light text-[clamp(28px,3.5vw,42px)] text-lux-dark tracking-[-0.02em]">Nos Univers</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/products?cat=${cat.id}`} className="group relative overflow-hidden bg-cream" style={{aspectRatio:'4/3'}}>
              <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" sizes="33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-gold/8" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-sans font-medium text-white text-base tracking-wide">{cat.name}</h3>
                <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-gold text-[10px] tracking-[0.25em] uppercase">Voir la collection</span>
                  <svg className="w-3 h-3 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-24 bg-[#F9F7F4]">
        <div className="container-lux">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-[1px] bg-gold" />
                <span className="text-gold text-[11px] tracking-[0.3em] uppercase font-medium">Notre sélection</span>
              </div>
              <h2 className="font-sans font-light text-[clamp(28px,3.5vw,42px)] text-lux-dark tracking-[-0.02em]">Produits Vedettes</h2>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-2 text-lux-gray text-[11px] tracking-[0.25em] uppercase hover:text-gold transition-colors group">
              <span>Voir tout</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* PROMO 2 COLONNES */}
      <section className="py-24 container-lux">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative overflow-hidden bg-lux-dark flex items-end p-8 group" style={{aspectRatio:'4/3'}}>
            <Image src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" alt="Maison" fill className="object-cover opacity-45 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative z-10">
              <span className="text-gold text-[10px] tracking-[0.3em] uppercase">Nouvelle collection</span>
              <h3 className="font-sans font-light text-white text-[28px] leading-tight tracking-[-0.01em] mt-2">Art de vivre<br/><em className="font-serif">à la maison</em></h3>
              <Link href="/products?cat=maison" className="inline-flex items-center gap-2 mt-5 text-white/60 text-[11px] tracking-[0.25em] uppercase hover:text-gold transition-colors group/link">
                <span>Découvrir</span>
                <svg className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden bg-cream flex items-end p-8 group" style={{aspectRatio:'4/3'}}>
            <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="Mode" fill className="object-cover opacity-65 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="relative z-10">
              <span className="text-gold text-[10px] tracking-[0.3em] uppercase">Style intemporel</span>
              <h3 className="font-sans font-light text-white text-[28px] leading-tight tracking-[-0.01em] mt-2">Mode &<br/><em className="font-serif">Accessoires</em></h3>
              <Link href="/products?cat=mode" className="inline-flex items-center gap-2 mt-5 text-white/60 text-[11px] tracking-[0.25em] uppercase hover:text-gold transition-colors group/link">
                <span>Explorer</span>
                <svg className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      {best.length > 0 && (
        <section className="py-24 bg-lux-dark">
          <div className="container-lux">
            <div className="flex items-end justify-between mb-14">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-[1px] bg-gold" />
                  <span className="text-gold text-[11px] tracking-[0.3em] uppercase font-medium">Les plus populaires</span>
                </div>
                <h2 className="font-sans font-light text-[clamp(28px,3.5vw,42px)] text-white tracking-[-0.02em]">Best-Sellers</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {best.slice(0,3).map(p => (
                <Link key={p.id} href={`/products/${p.id}`} className="group block">
                  <div className="relative overflow-hidden bg-white/5" style={{aspectRatio:'1/1'}}>
                    <Image src={p.image} alt={p.name} fill className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" sizes="33vw" />
                    <span className="absolute top-3 left-3 bg-gold text-white text-[9px] tracking-[0.25em] uppercase px-2.5 py-1">Best-seller</span>
                  </div>
                  <div className="pt-4">
                    <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase">{p.category}</p>
                    <h3 className="text-white text-sm font-medium mt-1.5 group-hover:text-gold transition-colors">{p.name}</h3>
                    <p className="font-serif text-gold mt-1 text-base">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      <section className="py-24 bg-[#F9F7F4]">
        <div className="container-lux">
          <div className="max-w-md mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-6 h-[1px] bg-gold" />
              <span className="text-gold text-[11px] tracking-[0.3em] uppercase font-medium">Restez informé</span>
              <div className="w-6 h-[1px] bg-gold" />
            </div>
            <h2 className="font-sans font-light text-[clamp(26px,3vw,38px)] text-lux-dark tracking-[-0.02em]">Abonnez-vous</h2>
            <p className="text-lux-gray text-sm font-light mt-4 mb-8 leading-relaxed">Recevez nos nouveautés, offres exclusives et inspirations dans votre boîte mail.</p>
            <div className="flex gap-0">
              <input type="email" placeholder="Votre adresse email" className="input-lux flex-1 text-sm" />
              <button className="btn-gold shrink-0 px-6 text-[11px]"><span>S'inscrire</span></button>
            </div>
            <p className="text-lux-gray/60 text-[11px] mt-3 tracking-wide">Pas de spam. Désabonnement à tout moment.</p>
          </div>
        </div>
      </section>

    </div>
  )
}
