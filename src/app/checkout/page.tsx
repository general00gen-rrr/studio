'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/lib/cartStore'
import { formatPrice } from '@/lib/products'

export default function CheckoutPage() {
  const { items, total, clearCart, removeItem } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ fullName: '', phone: '', city: '' })
  const [errors, setErrors] = useState<Record<string,string>>({})

  const shipping = total() >= 500 ? 0 : 50
  const orderTotal = total() + shipping

  useEffect(() => {
    if (items.length === 0 && !submitted) {
      router.push('/products')
    }
  }, [items.length, router, submitted])

  const validate = () => {
    const e: Record<string,string> = {}
    if (!form.fullName.trim()) e.fullName = 'الاسم الكامل مطلوب'
    if (!form.phone.match(/^(\+212|0)[5-7][0-9]{8}$/)) e.phone = 'رقم هاتف مغربي غير صحيح (مثال: 06 12 34 56 78)'
    if (!form.city.trim()) e.city = 'يرجى إدخال المدينة والعنوان'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setSubmitted(true)
    await new Promise(r => setTimeout(r, 1500))
    clearCart()
    router.push('/confirmation?name=' + encodeURIComponent(form.fullName.split(' ')[0]))
  }

  if (items.length === 0 && !submitted) return null

  return (
    <div className="pt-[88px] min-h-screen bg-slate-50 font-sans" dir="rtl">
      {/* Header Bar */}
      <div className="bg-sky-50 border-b border-sky-100 py-8">
        <div className="container-lux">
          <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900">إتمام الطلب والشحن</h1>
          <div className="w-12 h-1 bg-sky-500 rounded-full mt-3" />
          <div className="flex items-center gap-6 mt-4 text-xs font-bold text-slate-500">
            {['معلومات التوصيل','طريقة الشحن','تأكيد الطلب'].map((step, i) => (
              <span key={step} className={`flex items-center gap-2 ${i === 0 ? 'text-sky-600' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-600'}`}>{i+1}</span>
                {step}
                {i < 2 && <span className="text-slate-300 mr-2">-</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container-lux py-10">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Form Column */}
            <div className="lg:col-span-2 space-y-6">

              {/* Step 1: User Info */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <h2 className="font-display font-bold text-lg text-slate-900 mb-5 flex items-center gap-2.5">
                  <span className="w-7 h-7 bg-sky-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  معلومات التوصيل والمستلم
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      الاسم الكامل<span className="text-sky-600 mr-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={e => setForm({...form, fullName: e.target.value})}
                      placeholder="مثال: محمد العلمي"
                      className={`input-lux ${errors.fullName ? 'border-red-400 focus:ring-red-200' : ''}`}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs font-bold mt-1.5">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      رقم الهاتف (للتأكيد والتوصيل)<span className="text-sky-600 mr-1">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})}
                      placeholder="06 12 34 56 78"
                      className={`input-lux ${errors.phone ? 'border-red-400 focus:ring-red-200' : ''}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs font-bold mt-1.5">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      المدينة والعنوان الكامل<span className="text-sky-600 mr-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={e => setForm({...form, city: e.target.value})}
                      placeholder="مثال: أكادير، شارع الحسن الثاني، الدار البيضاء..."
                      className={`input-lux ${errors.city ? 'border-red-400 focus:ring-red-200' : ''}`}
                    />
                    {errors.city && <p className="text-red-500 text-xs font-bold mt-1.5">{errors.city}</p>}
                  </div>
                </div>
              </div>

              {/* Step 2: Payment */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                <h2 className="font-display font-bold text-lg text-slate-900 mb-5 flex items-center gap-2.5">
                  <span className="w-7 h-7 bg-sky-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  طريقة الدفع
                </h2>
                <div className="border-2 border-sky-500 bg-sky-50/50 p-4 rounded-xl flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-sky-600 bg-sky-600 shrink-0 mt-0.5 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">الدفع نقداً عند الاستلام (Cash on Delivery)</p>
                      <p className="text-slate-600 text-xs mt-1">تدفع نقداً مباشرة لمسؤول التوصيل بعد استلام ومعاينة شحنتك. 100% آمن.</p>
                    </div>
                  </div>
                  <span className="text-2xl shrink-0">💵</span>
                </div>
                <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <p className="text-xs text-emerald-800 font-semibold leading-relaxed">
                    🛡️ تسوق بدون مخاطرة: لا تحتاج لدفع أي درهم مسبقاً — المعاينة والتأكد من الجهاز حق لك قبل التسليم.
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Column */}
            <div>
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sticky top-24 shadow-sm">
                <h2 className="font-display font-bold text-base text-slate-900 mb-4 pb-3 border-b border-slate-100">تفاصيل الطلب</h2>
                
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3 items-center relative group p-2 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-lg border border-slate-200">
                        <Image src={item.image} alt={item.name} fill unoptimized={true} className="object-cover" sizes="48px" />
                        <span className="absolute -top-1 -right-1 bg-sky-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{item.quantity}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">{item.name}</p>
                        <p className="text-[11px] text-sky-600 font-bold mt-0.5">{formatPrice(item.price)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
                        aria-label="حذف"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs font-bold text-slate-600">
                  <div className="flex justify-between"><span>المجموع الفرعي</span><span className="text-slate-900">{formatPrice(total())}</span></div>
                  <div className="flex justify-between"><span>الشحن والتوصيل</span><span className={shipping === 0 ? 'text-emerald-600 font-extrabold' : 'text-slate-900'}>{shipping === 0 ? 'مجاني 🎉' : formatPrice(shipping)}</span></div>
                  <div className="flex justify-between font-extrabold text-sm pt-3 border-t border-slate-100 mt-2 text-slate-900">
                    <span>المجموع الكلي</span>
                    <span className="font-display text-sky-600 text-lg">{formatPrice(orderTotal)}</span>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-aqua w-full justify-center mt-5 text-sm py-3.5 rounded-xl disabled:opacity-60 shadow-lg shadow-sky-600/20">
                  <span>{loading ? 'جاري تأكيد طلبك...' : `تأكيد الطلب — ${formatPrice(orderTotal)}`}</span>
                </button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}
