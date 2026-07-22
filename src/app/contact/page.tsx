import Link from 'next/link'

export default function Page() {
  return (
    <div className="pt-[88px] min-h-screen bg-white">
      <div className="bg-sky-50 border-b border-sky-100 py-12 md:py-16">
        <div className="container-lux">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-sky-600">
            <Link href="/" className="hover:underline">الرئيسية</Link>
            <span>/</span>
            <span className="text-slate-500">تواصل معنا</span>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-5xl text-slate-900">تواصل مع أكوا كلين</h1>
          <div className="w-12 h-1 bg-sky-500 rounded-full mt-4" />
          <p className="text-slate-600 text-sm mt-3">فريق خدمة العملاء والاستشارات في خدمتكم دائماً</p>
        </div>
      </div>
      <div className="container-lux py-12 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          
          <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl mb-4">💬</div>
            <h3 className="font-display font-bold text-slate-900 text-lg mb-1">واتساب المباشر</h3>
            <p className="text-sky-600 font-bold text-base mb-1" dir="ltr">+212 770 469 416</p>
            <p className="text-slate-500 text-xs mb-6">استجابة سريعة — الإثنين إلى السبت (9:00 - 18:00)</p>
            <a href="https://wa.me/212770469416" target="_blank" rel="noreferrer" className="btn-aqua inline-flex w-full text-center justify-center">
              <span>تواصل عبر واتساب</span>
            </a>
          </div>

          <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center text-3xl mb-4">📧</div>
            <h3 className="font-display font-bold text-slate-900 text-lg mb-1">البريد الإلكتروني</h3>
            <p className="text-sky-600 font-bold text-base mb-1">contact@aquaclean.ma</p>
            <p className="text-slate-500 text-xs mb-6">الرد خلال 24 ساعة عمل</p>
            <a href="mailto:contact@aquaclean.ma" className="btn-aqua inline-flex w-full text-center justify-center">
              <span>إرسال بريد إلكتروني</span>
            </a>
          </div>

        </div>
        
        <div className="mb-8 pb-8 border-b border-slate-100 bg-slate-50 p-6 rounded-2xl">
          <h2 className="font-display font-bold text-lg text-slate-900 mb-2">أوقات العمل واستشارات المياه</h2>
          <p className="text-slate-600 text-sm leading-relaxed">فريقنا متخصص في الإجابة على جميع تساؤلاتكم بخصوص اختيار الجهاز الأنسب لدرجة ملوحة وكلس المياه في منطقتكم. نحن متاحون من الإثنين إلى السبت من الساعة 9:00 صباحاً حتى 6:00 مساءً.</p>
        </div>
        
        <div className="mb-8 pb-8 border-b border-slate-100 bg-slate-50 p-6 rounded-2xl">
          <h2 className="font-display font-bold text-lg text-slate-900 mb-2">خدمة التوصيل والصيانة بالمغرب</h2>
          <p className="text-slate-600 text-sm leading-relaxed">تعمل شركة أكوا كلين (AquaClean) داخل المملكة المغربية وتغطي كافة المدن والأقاليم. يقع مركز التوزيع والتجهيز بمدينة الدار البيضاء. لأي استفسارات تجارية أو صيانة دورية، يسعدنا تواصلكم دائماً.</p>
        </div>
      </div>
    </div>
  )
}
