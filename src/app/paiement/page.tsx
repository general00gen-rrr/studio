import Link from 'next/link'

export default function Page() {
  return (
    <div className="pt-[88px] min-h-screen bg-white">
      <div className="bg-sky-50 border-b border-sky-100 py-12 md:py-16">
        <div className="container-lux">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-sky-600">
            <Link href="/" className="hover:underline">الرئيسية</Link>
            <span>/</span>
            <span className="text-slate-500">الدفع عند الاستلام</span>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-5xl text-slate-900">الدفع عند الاستلام المعاينة</h1>
          <div className="w-12 h-1 bg-sky-500 rounded-full mt-4" />
          <p className="text-slate-600 text-sm mt-3">ادفع نقداً فقط بعد أن تستلم شحنتك وتتأكد منها</p>
        </div>
      </div>
      <div className="container-lux py-12 max-w-4xl space-y-8">
        
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h2 className="font-display font-bold text-lg text-slate-900 mb-2">تسوق بدون أي مخاطرة</h2>
          <p className="text-slate-600 text-sm leading-relaxed">مع أكوا كلين، لا تحتاج لإدخال أي بطاقة بنكية أو الدفع المسبق عبر الإنترنت. يمكنك الشراء بكل أريحية والدفع نقداً لمسؤول التوصيل عند باب منزلك.</p>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h2 className="font-display font-bold text-lg text-slate-900 mb-2">حق المعاينة والتأكد</h2>
          <p className="text-slate-600 text-sm leading-relaxed">يحق لك معاينة الشحنة والاطمئنان على سلامة الجهاز والمكونات المرفقة قبل تسليم المبلغ للموزع لضمان شفافية وراحة بال تامة.</p>
        </div>

        <div className="p-8 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-3xl text-center shadow-lg">
          <h3 className="font-display font-bold text-xl mb-2">100% ثقة وأمان</h3>
          <p className="text-sky-100 text-sm">نحن نثق بمنتجاتنا وخدمتنا، ولهذا نوفر لك خيار الدفع بعد المعاينة في كافة أرجاء المملكة المغربية.</p>
        </div>
      </div>
    </div>
  )
}
