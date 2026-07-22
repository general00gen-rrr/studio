import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="container-lux grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-1">
          <Link href="/" className="inline-block mb-4">
            <img 
              src="/header-logo.png" 
              alt="AquaClean Logo" 
              className="h-10 md:h-12 w-auto object-contain brightness-0 invert drop-shadow"
            />
          </Link>
          <p className="text-slate-400 text-xs leading-relaxed mt-2">
            أكوا كلين — العلامة الموثوقة لأجهزة ومصفيات المياه بالمغرب. مياه صحية ونقية لك ولعائلتك.
          </p>
        </div>
        {/* Navigation */}
        <div>
          <h4 className="text-xs font-bold uppercase text-cyan-400 mb-4">أقسام المتجر</h4>
          <ul className="space-y-2.5">
            {[['جميع الأجهزة','/products'],['العروض الجديدة','/products?badge=nouveau'],['الأكثر مبيعاً','/products?badge=bestseller'],['أنظمة التصفية','/products?cat=maison'],['قطع الغيار','/products?cat=mode']].map(([label,href]) => (
              <li key={href}><Link href={href} className="text-slate-400 text-xs hover:text-cyan-300 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        {/* Service */}
        <div>
          <h4 className="text-xs font-bold uppercase text-cyan-400 mb-4">خدمة العملاء</h4>
          <ul className="space-y-2.5">
            {[['كيفية الطلب','/comment-commander'],['الشحن والتوصيل','/livraison'],['الدفع عند الاستلام','/paiement'],['الضمان والإرجاع','/retours'],['الأسئلة الشائعة','/faq'],['اتصل بنا','/contact']].map(([item,href]) => (
              <li key={item}><Link href={href} className="text-slate-400 text-xs hover:text-cyan-300 transition-colors">{item}</Link></li>
            ))}
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h4 className="text-xs font-bold uppercase text-cyan-400 mb-4">معلومات التواصل</h4>
          <ul className="space-y-3 text-xs text-slate-400">
            <li className="flex items-center gap-2">
              <span className="text-cyan-400">📱</span>
              <span dir="ltr">+212 6 00 00 00 00</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-400">✉️</span>
              <span>contact@aquaclean.ma</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-cyan-400">🕒</span>
              <span>الإثنين – السبت: 9:00 - 18:00</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 mt-12 pt-6 text-center text-xs text-slate-500">
        © 2026 أكوا كلين (AquaClean). جميع الحقوق محفوظة.
      </div>
    </footer>
  )
}
