'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cartStore'
import { formatPrice } from '@/lib/products'

export default function CartPage() {
  const { items, removeItem, updateQty, total, count } = useCart()

  if (items.length === 0) return (
    <div className="pt-[88px] min-h-screen flex items-center justify-center bg-white" dir="rtl">
      <div className="text-center py-20 px-4">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 mb-2">سلة الشراء فارغة حالياً</h1>
        <p className="text-slate-500 text-xs mb-8">استكشف أحدث أجهزة ومصفيات المياه المنزلية من أكوا كلين</p>
        <Link href="/products" className="btn-aqua text-xs py-3.5 rounded-xl"><span>تصفح الأجهزة والأنظمة</span></Link>
      </div>
    </div>
  )

  return (
    <div className="pt-[88px] min-h-screen bg-slate-50" dir="rtl">
      <div className="bg-sky-50 border-b border-sky-100 py-8">
        <div className="container-lux">
          <h1 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900">سلة التسوق</h1>
          <div className="w-12 h-1 bg-sky-500 rounded-full mt-3" />
          <p className="text-slate-500 text-xs mt-2 font-bold">تحتوي السلة على {count()} منتج</p>
        </div>
      </div>

      <div className="container-lux py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Items List */}
          <div className="lg:col-span-2 space-y-3">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm items-center">
                <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
                  <Image src={item.image} alt={item.name} fill unoptimized={true} className="object-cover" sizes="80px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-slate-900 truncate">{item.name}</h3>
                  <p className="text-sky-600 font-bold text-sm mt-1">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                      <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-sky-600 font-bold">−</button>
                      <span className="w-8 text-center text-xs font-bold text-slate-800">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-sky-600 font-bold">+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-xs text-slate-400 hover:text-red-500 font-bold transition-colors">حذف</button>
                  </div>
                </div>
                <div className="text-left shrink-0">
                  <p className="font-display font-extrabold text-base text-slate-900">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sticky top-24 shadow-sm">
              <h2 className="font-display font-bold text-base text-slate-900 mb-4 pb-3 border-b border-slate-100">ملخص الطلب</h2>
              <div className="space-y-2.5 mb-4 pb-4 border-b border-slate-100 text-xs font-bold text-slate-600">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span className="truncate max-w-[160px] text-slate-700">{item.name} ×{item.quantity}</span>
                    <span className="text-slate-900">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-600">الشحن والتوصيل</span>
                <span className="text-emerald-600 font-extrabold">{total() >= 500 ? 'مجاني 🎉' : '50 د.م'}</span>
              </div>
              {total() < 500 && (
                <p className="text-[11px] text-sky-600 font-bold mb-3 bg-sky-50 p-2 rounded-lg border border-sky-100">
                  أضف أجهزة بـ {formatPrice(500 - total())} أخرى للحصول على شحن مجاني!
                </p>
              )}
              <div className="flex justify-between font-extrabold text-base pt-3 border-t border-slate-100 mt-3 text-slate-900">
                <span>المجموع الكلي</span>
                <span className="font-display text-sky-600 text-lg">{formatPrice(total() >= 500 ? total() : total() + 50)}</span>
              </div>
              
              <Link href="/checkout" className="btn-aqua w-full text-center justify-center mt-5 text-sm py-3.5 rounded-xl shadow-lg shadow-sky-600/20">
                <span>إتمام الطلب — الدفع عند الاستلام</span>
              </Link>
              <Link href="/products" className="block text-center mt-3 text-xs text-slate-500 hover:text-sky-600 font-bold transition-colors">
                ← متابعة التسوق
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
