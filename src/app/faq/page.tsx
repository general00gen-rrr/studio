import Link from 'next/link'

export default function Page() {
  return (
    <div className="pt-[88px] min-h-screen bg-white">
      <div className="bg-sky-50 border-b border-sky-100 py-12 md:py-16">
        <div className="container-lux">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-sky-600">
            <Link href="/" className="hover:underline">الرئيسية</Link>
            <span>/</span>
            <span className="text-slate-500">الأسئلة الشائعة</span>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-5xl text-slate-900">الأسئلة الشائعة</h1>
          <div className="w-12 h-1 bg-sky-500 rounded-full mt-4" />
          <p className="text-slate-600 text-sm mt-3">إجابات شاملة عن أنظمة أكوا كلين وجودة المياه</p>
        </div>
      </div>
      <div className="container-lux py-12 max-w-4xl space-y-6">
        
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
            <span className="text-sky-600">س.</span> كيف أقوم بطلب جهاز تنقية أو فلتر مياه؟
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed pr-6">أضف المنتجات لسلة الشراء، ثم ادخل اسمك ورقم هاتفك وعنوانك. سيتصل بك فريقنا لتأكيد الموعد والتفاصيل قبل الشحن.</p>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
            <span className="text-sky-600">س.</span> كم تستغرق مدة التوصيل؟
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed pr-6">يستغرق التوصيل بين 24 و 48 ساعة عمل كحد أقصى لكافة مدن المملكة المغربية.</p>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
            <span className="text-sky-600">س.</span> هل الدفع متاح عند الاستلام والمعاينة؟
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed pr-6">نعم بالتأكيد! لا تدفع أي درهم حتى تصلك الشحنة وتفحص الجهاز بنفسك لتضمن سلامته وجودته.</p>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
            <span className="text-sky-600">س.</span> متى يجب علي استبدال شمعات الفلتر؟
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed pr-6">ننصح باستبدال الشمعات الثلاث الأولى كل 6 أشهر، بينما تمتد شمعة الممبرين من 18 إلى 24 شهراً بحسب جودة مياه المنطقة.</p>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
            <span className="text-sky-600">س.</span> هل التوصيل مجاني؟
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed pr-6">نعم، التوصيل مجاني تماماً لجميع الطلبات بقيمة 500 درهم أو أكثر في كافة مدن المغرب.</p>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
            <span className="text-sky-600">س.</span> هل تتوافر قطع الغيار والشمعات بصفة دائمية؟
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed pr-6">نعم، نوفر جميع الشمعات والمضخات والصنابير الأصلية بصفة مستمرة مع إمكانية إرسال التذكير بموعد الصيانة.</p>
        </div>

      </div>
    </div>
  )
}
