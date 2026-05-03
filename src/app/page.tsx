import Link from 'next/link'
import Image from 'next/image'
import { getFeatured, categories, getBest, getNew, formatPrice } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

export default function HomePage() {
  const featured = getFeatured()
  const best = getBest()
  const newest = getNew()

  return (
    <div className="pt-[88px]">

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-lux-dark">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=90"
            alt="Hero"
            fill
            className="object-cover object-center opacity-40"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-lux-dark/90 via-lux-dark/60 to-transparent" />
        <div className="relative z-10 container-lux py-20">
          <div className="max-w-xl">
            <p className="section-label text-gold animate-fade-in delay-100">Collection 2024</p>
            <h1 className="font-serif text-5xl md:text-7xl text-white font-light leading-[1.05] mt-3 animate-fade-up delay-200">
              L'Art du<br/>
              <em>Quotidien</em>
            </h1>
            <div className="gold-divider animate-fade-in delay-300" />
            <p className="text-white/65 text-base leading-relaxed animate-fade-up delay-300 max-w-sm">
              Des produits soigneusement sélectionnés pour sublimer votre vie. Livraison dans tout le Maroc.
            </p>
            <div className="flex flex-wrap gap-4 mt-8 animate-fade-up delay-400">
              <Link href="/products" className="btn-gold"><span>Découvrir la collection</span></Link>
              <Link href="/products?badge=nouveau" className="btn-outline border-white text-white hover:bg-white hover:text-lux-dark"><span>Nouveautés</span></Link>
            </div>
            <p className="text-white/40 text-xs tracking-widest uppercase mt-8 animate-fade-in delay-500">
              ✓ Paiement à la livraison &nbsp;•&nbsp; ✓ Livraison 24-48h &nbsp;•&nbsp; ✓ Retour gratuit
            </p>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/40 text-[10px] tracking-widest uppercase">Défiler</span>
          <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7"/></svg>
        </div>
      </section>

      {/* COD BANNER */}
      <section className="bg-gold py-4">
        <div className="container-lux flex flex-wrap justify-center gap-8 text-white text-xs tracking-widest uppercase font-medium">
          <span>🚚 Livraison Rapide 24–48h</span>
          <span>💳 Paiement à la Livraison</span>
          <span>↩️ Retour Gratuit 30 Jours</span>
          <span>🌟 Produits Premium Sélectionnés</span>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 container-lux">
        <div className="text-center mb-12">
          <p className="section-label">Explorer par univers</p>
          <h2 className="section-title">Nos Univers</h2>
          <div className="gold-divider mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <Link key={cat.id} href={`/products?cat=${cat.id}`} className="group relative overflow-hidden aspect-[4/3] bg-cream">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lux-dark/80 via-lux-dark/20 to-transparent" />
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-white text-xl font-medium">{cat.name}</h3>
                <p className="text-white/70 text-xs mt-1">{cat.description}</p>
                <span className="inline-block mt-2 text-gold text-xs tracking-widest uppercase border-b border-gold/40 group-hover:border-gold transition-colors">
                  Voir →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-20 bg-cream">
        <div className="container-lux">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label">Notre sélection</p>
              <h2 className="section-title">Produits Vedettes</h2>
              <div className="gold-divider" />
            </div>
            <Link href="/products" className="text-xs tracking-widest uppercase border-b border-lux-dark hover:border-gold hover:text-gold transition-colors pb-0.5 hidden md:block">
              Voir tout →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-10 md:hidden">
            <Link href="/products" className="btn-outline"><span>Voir tous les produits</span></Link>
          </div>
        </div>
      </section>

      {/* PROMO SECTION */}
      <section className="py-20 container-lux">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative overflow-hidden bg-lux-dark aspect-[4/3] flex items-end p-8 group">
            <Image src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" alt="Maison" fill className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" />
            <div className="relative z-10">
              <p className="text-gold text-xs tracking-widest uppercase mb-2">Nouvelle collection</p>
              <h3 className="font-serif text-white text-3xl font-light">Art de vivre<br/><em>à la maison</em></h3>
              <Link href="/products?cat=maison" className="inline-block mt-4 text-white text-xs tracking-widest uppercase border-b border-white/40 hover:border-gold hover:text-gold transition-colors">Découvrir →</Link>
            </div>
          </div>
          <div className="relative overflow-hidden bg-cream aspect-[4/3] flex items-end p-8 group">
            <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="Mode" fill className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-lux-dark/70 to-transparent" />
            <div className="relative z-10">
              <p className="text-gold text-xs tracking-widest uppercase mb-2">Style intemporel</p>
              <h3 className="font-serif text-white text-3xl font-light">Mode &<br/><em>Accessoires</em></h3>
              <Link href="/products?cat=mode" className="inline-block mt-4 text-white text-xs tracking-widest uppercase border-b border-white/40 hover:border-gold hover:text-gold transition-colors">Explorer →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      {best.length > 0 && (
        <section className="py-20 bg-lux-dark text-white">
          <div className="container-lux">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-2">Les plus populaires</p>
                <h2 className="font-serif text-4xl font-light">Best-Sellers</h2>
                <div className="gold-divider" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {best.slice(0,3).map(p => (
                <Link key={p.id} href={`/products/${p.id}`} className="group block">
                  <div className="relative overflow-hidden aspect-square bg-white/5">
                    <Image src={p.image} alt={p.name} fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" sizes="33vw" />
                    <span className="absolute top-3 left-3 bg-gold text-white text-[10px] tracking-widest uppercase px-2 py-1">Best-seller</span>
                  </div>
                  <div className="pt-3">
                    <p className="text-white/50 text-[10px] tracking-widest uppercase">{p.category}</p>
                    <h3 className="text-white font-medium mt-1 group-hover:text-gold transition-colors">{p.name}</h3>
                    <p className="font-serif text-gold mt-1">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      <section className="py-20 bg-cream">
        <div className="container-lux">
          <div className="max-w-lg mx-auto text-center">
            <p className="section-label">Restez informé</p>
            <h2 className="section-title">Abonnez-vous</h2>
            <div className="gold-divider mx-auto" />
            <p className="text-lux-gray text-sm mt-4 mb-8">Recevez nos nouveautés, offres exclusives et inspirations directement dans votre boîte mail.</p>
            <div className="flex gap-0">
              <input type="email" placeholder="Votre adresse email" className="input-lux flex-1" />
              <button className="btn-gold shrink-0 px-6"><span>S'inscrire</span></button>
            </div>
            <p className="text-lux-gray text-xs mt-3">Pas de spam. Désabonnement à tout moment.</p>
          </div>
        </div>
      </section>

    </div>
  )
}
