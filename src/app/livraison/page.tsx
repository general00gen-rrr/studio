import Link from 'next/link'

export default function Page() {
  return (
    <div className="pt-[88px] min-h-screen bg-white">
      <div className="bg-sky-50 border-b border-sky-100 py-12 md:py-16">
        <div className="container-lux">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-sky-600">
            <Link href="/" className="hover:underline">الرئيسية</Link>
            <span>/</span>
            <span className="text-slate-500">الشحن والتوصيل</span>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-5xl text-slate-900">الشحن والتوصيل بالمغرب</h1>
          <div className="w-12 h-1 bg-sky-500 rounded-full mt-4" />
          <p className="text-slate-600 text-sm mt-3">توصيل آمن وسريع لجميع المدن والأقاليم</p>
        </div>
      </div>
      <div className="container-lux py-12 max-w-4xl space-y-8">
        
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h2 className="font-display font-bold text-lg text-slate-900 mb-2">مدة التوصيل</h2>
          <p className="text-slate-600 text-sm leading-relaxed">تُسلّم جميع الطلبيات في غضون 24 إلى 48 ساعة عمل. يتميز التوصيل للسكّان في المدن الكبرى (الدار البيضاء، الرباط، مراكش، فاس، طنجة، أغادير) بالسرعة الفائقة خلال 24 ساعة.</p>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h2 className="font-display font-bold text-lg text-slate-900 mb-2">التوصيل المجاني</h2>
          <p className="text-slate-600 text-sm leading-relaxed">تستفيد من التوصيل المجاني الشامل عند الشراء بمبلغ 500 درهم أو أكثر. نغطي التكلفة بالكامل لضمان أفضل تجربة تسوق.</p>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h2 className="font-display font-bold text-lg text-slate-900 mb-2">تغليف محكم وآمن للأجهزة</h2>
          <p className="text-slate-600 text-sm leading-relaxed">تغلف جميع أجهزة وتجهيزات أكوا كلين بصناديق حماية مخصصة تمنع أي كسر أو تلف أثناء النقل، لتصلك الشحنة بحالة ممتازة وجاهزة للاستخدام.</p>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 text-center">
          <div className="p-5 bg-sky-50 rounded-2xl border border-sky-100">
            <p className="text-3xl mb-2">🚚</p>
            <p className="font-bold text-slate-800 text-sm">24–48h</p>
            <p className="text-slate-500 text-xs mt-1">توصيل سريع</p>
          </div>
          <div className="p-5 bg-sky-50 rounded-2xl border border-sky-100">
            <p className="text-3xl mb-2">📦</p>
            <p className="font-bold text-slate-800 text-sm">تغليف آمن</p>
            <p className="text-slate-500 text-xs mt-1">حماية للأجهزة</p>
          </div>
          <div className="p-5 bg-sky-50 rounded-2xl border border-sky-100">
            <p className="text-3xl mb-2">🇲🇦</p>
            <p className="font-bold text-slate-800 text-sm">كافة المدن</p>
            <p className="text-slate-500 text-xs mt-1">تغطية شاملة</p>
          </div>
        </div>
      </div>
    </div>
  )
}
