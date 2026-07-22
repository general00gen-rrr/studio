import Link from 'next/link'

export default function Page() {
  return (
    <div className="pt-[88px] min-h-screen bg-white">
      <div className="bg-sky-50 border-b border-sky-100 py-12 md:py-16">
        <div className="container-lux">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-sky-600">
            <Link href="/" className="hover:underline">الرئيسية</Link>
            <span>/</span>
            <span className="text-slate-500">الضمان والإرجاع</span>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-5xl text-slate-900">سياسة الضمان والإرجاع</h1>
          <div className="w-12 h-1 bg-sky-500 rounded-full mt-4" />
          <p className="text-slate-600 text-sm mt-3">ضمان حقيقي ورضا تام عن كافة منتجات أكوا كلين</p>
        </div>
      </div>
      <div className="container-lux py-12 max-w-4xl space-y-6">
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-900 text-base mb-2">الضمان الشامل</h3>
          <p className="text-slate-600 text-sm leading-relaxed">تأتي جميع أنظمة الأسموز ومصفيات المياه مع ضمان ضد العيوب المصنعية وقطع التبديل الأصلية.</p>
        </div>
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-900 text-base mb-2">حق الاستبدال خلال 14 يوماً</h3>
          <p className="text-slate-600 text-sm leading-relaxed">في حال وجود أي مشكلة بالمنتج أو عدم تطابقه مع التوصيف، يسعدنا استبداله لك مجاناً وبدون أي مصاريف إضافية.</p>
        </div>
      </div>
    </div>
  )
}
