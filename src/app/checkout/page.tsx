'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/lib/cartStore'
import { formatPrice } from '@/lib/products'

const CITIES = ['Casablanca','Rabat','Marrakech','Fès','Tanger','Agadir','Meknès','Oujda','Kenitra','Tétouan','Safi','El Jadida','Beni Mellal','Mohammedia','Khouribga','Laâyoune','Settat','Berrechid','Nador','Khemisset']

export default function CheckoutPage() {
  const { items, total, clearCart, removeItem } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ fullName: '', phone: '', city: '' })
  const [errors, setErrors] = useState<Record<string,string>>({})

  const shipping = total() >= 500 ? 0 : 50
  const orderTotal = total() + shipping

  const validate = () => {
    const e: Record<string,string> = {}
    if (!form.fullName.trim()) e.fullName = 'Nom complet requis'
    if (!form.phone.match(/^(\+212|0)[5-7][0-9]{8}$/)) e.phone = 'Numero marocain invalide (ex: 06 12 34 56 78)'
    if (!form.city) e.city = 'Ville requise'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    clearCart()
    router.push('/confirmation?name=' + encodeURIComponent(form.fullName.split(' ')[0]))
  }

  if (items.length === 0) {
    if (typeof window !== 'undefined') router.push('/products')
    return null
  }

  return (
    <div className="pt-[88px] min-h-screen">
      <div className="bg-cream border-b border-lux-border py-10">
        <div className="container-lux">
          <h1 className="section-title">Finaliser la commande</h1>
          <div className="gold-divider" />
          <div className="flex items-center gap-6 mt-4 text-xs text-lux-gray">
            {['Informations','Livraison','Confirmation'].map((step, i) => (
              <span key={step} className={`flex items-center gap-2 ${i === 0 ? 'text-gold font-medium' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${i === 0 ? 'bg-gold text-white' : 'bg-lux-border text-lux-gray'}`}>{i+1}</span>
                {step}
                {i < 2 && <span className="text-lux-border ml-4">-</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container-lux py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">

              <div className="bg-white border border-lux-border p-6">
                <h2 className="font-serif text-xl mb-5 flex items-center gap-3">
                  <span className="w-7 h-7 bg-gold text-white flex items-center justify-center text-xs font-medium">1</span>
                  Vos informations
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-lux-gray mb-1.5">
                      Nom complet<span className="text-gold ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={e => setForm({...form, fullName: e.target.value})}
                      placeholder="Mohammed Alami"
                      className={`input-lux ${errors.fullName ? 'border-red-400' : ''}`}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs tracking-widest uppercase text-lux-gray mb-1.5">
                      Telephone<span className="text-gold ml-1">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})}
                      placeholder="06 12 34 56 78"
                      className={`input-lux ${errors.phone ? 'border-red-400' : ''}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs tracking-widest uppercase text-lux-gray mb-1.5">
                      Ville<span className="text-gold ml-1">*</span>
                    </label>
                    <select
                      value={form.city}
                      onChange={e => setForm({...form, city: e.target.value})}
                      className={`input-lux ${errors.city ? 'border-red-400' : ''}`}
                    >
                      <option value="">Selectionner une ville</option>
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-lux-border p-6">
                <h2 className="font-serif text-xl mb-5 flex items-center gap-3">
                  <span className="w-7 h-7 bg-gold text-white flex items-center justify-center text-xs font-medium">2</span>
                  Mode de paiement
                </h2>
                <div className="border-2 border-gold bg-gold/5 p-4 flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full border-2 border-gold bg-gold shrink-0 mt-0.5 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Paiement a la livraison (Cash)</p>
                    <p className="text-lux-gray text-xs mt-1">Vous payez en especes directement au livreur lors de la reception de votre commande. 100% securise.</p>
                  </div>
                  <span className="text-2xl">💵</span>
                </div>
                <div className="mt-4 p-4 bg-cream border border-lux-border">
                  <p className="text-xs text-lux-gray leading-relaxed">
                    Aucun paiement en avance requis - Paiement uniquement a la reception - Verifiez votre colis avant de payer
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-cream border border-lux-border p-6 sticky top-24">
                <h2 className="font-serif text-lg mb-4">Ma Commande</h2>
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3 relative group">
                      <div className="relative w-12 h-12 shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover rounded" sizes="48px" />
                        <span className="absolute -top-1 -right-1 bg-lux-dark text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{item.quantity}</span>
                      </div>
                      <div className="flex-1 min-w-0 pr-5">
                        <p className="text-xs font-medium truncate">{item.name}</p>
                        <p className="text-xs text-lux-gray mt-0.5">{formatPrice(item.price)}</p>
                      </div>
                      <span className="text-xs font-medium shrink-0 pr-5">{formatPrice(item.price * item.quantity)}</span>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center rounded-full text-lux-gray hover:bg-red-50 hover:text-red-500 transition-all duration-200 opacity-0 group-hover:opacity-100"
                        aria-label="Supprimer"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-lux-border space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-lux-gray">Sous-total</span><span>{formatPrice(total())}</span></div>
                  <div className="flex justify-between"><span className="text-lux-gray">Livraison</span><span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'Gratuite' : formatPrice(shipping)}</span></div>
                  <div className="flex justify-between font-semibold text-base pt-2 border-t border-lux-border mt-2">
                    <span>Total</span>
                    <span className="font-serif text-gold text-xl">{formatPrice(orderTotal)}</span>
                  </div>
                </div>
                <p className="text-xs text-lux-gray mt-3 text-center">Paiement a la livraison</p>
                <button type="submit" disabled={loading} className="btn-gold w-full justify-center mt-4 disabled:opacity-60">
                  <span>{loading ? 'Traitement...' : `Confirmer - ${formatPrice(orderTotal)}`}</span>
                  {loading && <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin ml-2" />}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
