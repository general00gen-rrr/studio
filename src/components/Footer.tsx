import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-lux-dark text-white">
      {/* Main footer */}
      <div className="container-lux py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-1">
          <span className="font-serif text-2xl tracking-widest">LUXÉ</span>
          <div className="gold-divider mt-4 mb-4" />
          <p className="text-white/60 text-sm leading-relaxed">
            Sélection premium de produits pour votre quotidien. Livraison dans tout le Maroc.
          </p>
          <div className="flex gap-4 mt-6">
            {['instagram','facebook','pinterest'].map(s => (
              <a key={s} href="#" className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/60 hover:border-gold hover:text-gold transition-colors text-xs uppercase">{s[0]}</a>
            ))}
          </div>
        </div>
        {/* Boutique */}
        <div>
          <h4 className="text-xs tracking-widest uppercase text-gold mb-6">Boutique</h4>
          <ul className="space-y-3">
            {[['Tous les produits','/products'],['Nouveautés','/products?badge=nouveau'],['Best-sellers','/products?badge=bestseller'],['Maison','/products?cat=maison'],['Mode','/products?cat=mode'],['Beauté','/products?cat=beaute']].map(([label,href]) => (
              <li key={href}><Link href={href} className="text-white/60 text-sm hover:text-gold transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        {/* Service */}
        <div>
          <h4 className="text-xs tracking-widest uppercase text-gold mb-6">Service Client</h4>
          <ul className="space-y-3">
            {[['Comment commander','/comment-commander'],['Livraison & délais','/livraison'],['Paiement à la livraison','/paiement'],['Retours & échanges','/retours'],['FAQ','/faq'],['Nous contacter','/contact']].map(([item,href]) => (
              <li key={item}><Link href={href} className="text-white/60 text-sm hover:text-gold transition-colors">{item}</Link></li>
            ))}
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h4 className="text-xs tracking-widest uppercase text-gold mb-6">Contact</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li className="flex items-start gap-3">
              <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              +212 6 00 00 00 00
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              contact@luxe-boutique.ma
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Lun–Sam: 9h–18h
            </li>
          </ul>
          <div className="mt-6 p-4 border border-white/10 bg-white/5">
            <p className="text-xs text-white/60 mb-1">🇲🇦 Livraison dans tout le Maroc</p>
            <p className="text-xs text-gold font-medium">Paiement à la livraison</p>
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container-lux py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">© 2024 LUXÉ Boutique. Tous droits réservés.</p>
          <div className="flex gap-6">
            {['Confidentialité','CGV','Mentions légales'].map(item => (
              <a key={item} href="#" className="text-white/40 text-xs hover:text-white/70 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
