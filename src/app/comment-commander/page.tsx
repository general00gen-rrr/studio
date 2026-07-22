import Link from 'next/link'

export default function Page() {
  return (
    <div className="pt-[88px] min-h-screen bg-white">
      <div className="bg-sky-50 border-b border-sky-100 py-12 md:py-16">
        <div className="container-lux">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-sky-600">
            <Link href="/" className="hover:underline">الرئيسية</Link>
            <span>/</span>
            <span className="text-slate-500">كيفية الطلب</span>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-5xl text-slate-900">كيفية الطلب من أكوا كلين</h1>
          <div className="w-12 h-1 bg-sky-500 rounded-full mt-4" />
          <p className="text-slate-600 text-sm mt-3">خطوات بسيطة للحصول على مياه نقية في منزلك</p>
        </div>
      </div>
      <div className="container-lux py-12 max-w-4xl space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <div className="w-12 h-12 bg-sky-100 text-sky-600 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">1</div>
            <h3 className="font-bold text-slate-900 mb-2">اختر جهازك</h3>
            <p className="text-slate-500 text-xs leading-relaxed">تصفح الأجهزة والشمعات وأضف ما يناسبك إلى سلة الشراء.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <div className="w-12 h-12 bg-sky-100 text-sky-600 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">2</div>
            <h3 className="font-bold text-slate-900 mb-2">أدخل عنوانك</h3>
            <p className="text-slate-500 text-xs leading-relaxed">اكتب اسمك، رقم هاتفك، والمدينة ليتسنى لنا شحن الطلب إليك.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <div className="w-12 h-12 bg-sky-100 text-sky-600 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">3</div>
            <h3 className="font-bold text-slate-900 mb-2">استلم وادفع</h3>
            <p className="text-slate-500 text-xs leading-relaxed">سيتصل بك الموزع للتحقق والاستلام، وتدفع نقداً بعد المعاينة.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
