'use client'
import { useState } from 'react'

export default function Newsletter({ scriptUrl }: { scriptUrl: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setStatus('loading')

    try {
      await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          type: 'newsletter',
          email: email
        })
      })
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-20 bg-sky-50" id="newsletter">
      <div className="container-lux">
        <div className="max-w-xl mx-auto text-center bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-sky-100">
          <span className="text-sky-600 font-bold text-xs uppercase tracking-wider block mb-2">استشارات ونصائح مجانية</span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900">تواصل معنا لمعرفة الجهاز الأنسب لمنزلك</h2>
          <p className="text-slate-600 text-sm mt-3 mb-8">أدخل بريدك الإلكتروني ليصلك دليل اختيار أنظمة الفلترة المناسبة لماء منطقتك</p>
          
          {status === 'success' ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-sm rounded-xl animate-fade-in">
              🎉 تم تسجيل بريدك الإلكتروني بنجاح في القائمة البريدية!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني" 
                className="input-lux flex-1 text-sm rounded-xl" 
              />
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-3.5 text-sm rounded-xl transition-all shrink-0 disabled:opacity-60"
              >
                <span>{status === 'loading' ? 'جاري الإرسال...' : 'اشترك الآن'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
