'use client'
import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function ConfirmationContent() {
  const params = useSearchParams()
  const name = params.get('name') || 'عميلنا العزيز'
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    const id = 'AQ' + Math.random().toString(36).substr(2,8).toUpperCase()
    setOrderId(id)
  }, [])

  return (
    <div className="pt-[88px] min-h-screen flex items-center justify-center bg-sky-50/50 py-12" dir="rtl">
      <div className="max-w-lg w-full mx-auto text-center px-6 py-12 bg-white rounded-3xl border border-sky-100 shadow-xl">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl shadow-sm">
          ✓
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          تم استلام طلبك بنجاح 🎉
        </span>
        <h1 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 mt-3 mb-2">شكراً لثقتكم، {name}!</h1>
        <p className="text-slate-500 text-xs mb-6">سيتواصل معكم فريق أكوا كلين لتأكيد موعد التسليم</p>

        {/* Order Details Card */}
        <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl mb-6 text-right space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-slate-200/60">
            <span className="text-xs font-bold text-slate-500">رقم الطلب</span>
            <span className="font-mono font-bold text-sky-600 text-sm">{orderId ? `#${orderId}` : 'جاري الإنشاء...'}</span>
          </div>
          <div className="space-y-3 pt-1 text-xs font-medium text-slate-700">
            <div className="flex items-start gap-2.5">
              <span className="text-base">📞</span>
              <div>
                <p className="font-bold text-slate-900">الاتصال وتأكيد الموعد</p>
                <p className="text-slate-500 text-[11px]">سيتصل بك فريقنا هاتفياً خلال ساعات لتأكيد العنوان</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-base">🚚</span>
              <div>
                <p className="font-bold text-slate-900">الشحن والتوصيل</p>
                <p className="text-slate-500 text-[11px]">تصلك الشحنة خلال 24 إلى 48 ساعة عمل</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-base">💵</span>
              <div>
                <p className="font-bold text-slate-900">الدفع بعد المعاينة</p>
                <p className="text-slate-500 text-[11px]">تدفع نقداً لمسؤول التوصيل بعد فحص الجهاز</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-aqua text-xs py-3 rounded-xl"><span>العودة للرئيسية</span></Link>
          <Link href="/products" className="btn-outline text-xs py-3 rounded-xl"><span>تصفح بقية الأجهزة</span></Link>
        </div>

        <p className="text-slate-400 text-xs mt-8">
          لأي استفسار؟ اتصل بنا عبر الواتساب أو الهاتف: <a href="tel:+212770469416" className="text-sky-600 font-bold hover:underline" dir="ltr">+212 770 469 416</a>
        </p>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return <Suspense fallback={null}><ConfirmationContent /></Suspense>
}
