'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/lib/cartStore'
import { formatPrice } from '@/lib/products'

const CITIES = ['Casablanca','Rabat','Marrakech','Fès','Tanger','Agadir','Meknès','Oujda','Kenitra','Tétouan','Safi','El Jadida','Beni Mellal','Mohammedia','Khouribga','Laâyoune','Settat','Berrechid','Nador','Khemisset']

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', phone2: '', address: '', city: '', zip: '', note: '' })
  const [errors, setErrors] = useState<Record<string,string>>({})

  const shipping = total() >= 500 ? 0 : 50
  const orderTotal = total() + shipping

  const validate = () => {
    const e: Record<string,string> = {}
    if (!form.firstName.trim()) e.firstName = 'Prénom requis'
    if (!form.lastName.trim()) e.lastName = 'Nom requis'
    if (!form.phone.match(/^(\+212|0)[5-7][0-9]{8}$/)) e.phone = 'Numéro marocain invalide (ex: 06 12 34 56 78)'
    if (!form.address.trim()) e.address = 'Adresse requise'
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
    router.push('/confirmation?name=' + encodeURIComponent(form.firstName))
  }

  if (items.length === 0) {
    if (typeof window !== 'undefined') router.push('/products')
    return null
  }

  const Field = ({ name, label, type = 'text', placeholder = '', required = true }: { name: keyof typeof form; label: string; type?: string; placeholder?: string; required?: boolean }) => (
    <div>
      <label className="block text-xs tracking-widest uppercase text-lux-gray mb-1.5">{label}{required && <span className="text-gold ml-1">*</span>}</label>
      <input
        type={type}
        value={form[name]}
        onChange={e => setForm({...form, [name]: e.target.value})}
        placeholder={placeholder}
        className={`input-lux ${errors[name] ? 'border-red-400' : ''}`}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  )

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
                {i < 2 && <span className="text-lux-border ml-4">→</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container-lux py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal info */}
              <div className="bg-white border border-lux-border p-6">
                <h2 className="font-serif text-xl mb-5 flex items-center gap-3">
                  <span className="w-7 h-7 bg-gold text-white flex items-center justify-center text-xs font-medium">1</span>
                  Informations personnelles
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field name="firstName" label="Prénom" placeholder="Mohammed" />
                  <Field name="lastName" label="Nom" placeholder="Alami" />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Field name="phone" label="Téléphone principal" type="tel" placeholder="06 12 34 56 78" />
                  <Field name="phone2" label="Téléphone secondaire" type="tel" placeholder="06 12 34 56 78 (optionnel)" required={false} />
                </div>
              </div>

              {/* Delivery */}
              <div className="bg-white border border-lux-border p-6">
                <h2 className="font-serif text-xl mb-5 flex items-center gap-3">
                  <span className="w-7 h-7 bg-gold text-white flex items-center justify-center text-xs font-medium">2</span>
                  Adresse de livraison
                </h2>
                <Field name="address" label="Adresse complète" placeholder="N° rue, quartier, immeuble..." />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-lux-gray mb-1.5">Ville<span className="text-gold ml-1">*</span></label>
                    <select value={form.city} onChange={e => setForm({...form, city: e.target.value})} className={`input-lux ${errors.city ? 'border-red-400' : ''}`}>
                      <option value="">Sélectionner une ville</option>
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <Field name="zip" label="Code postal" placeholder="20000" required={false} />
                </div>
                <div className="mt-4">
                  <label className="block text-xs tracking-widest uppercase text-lux-gray mb-1.5">Note pour la livraison</label>
                  <textarea value={form.note} onChange={e => setForm({...form, note: e.target.value})} placeholder="Précisions sur l'adresse, horaires préférés..." rows={3} className="input-lux resize-none" />
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white border border-lux-border p-6">
                <h2 className="font-serif text-xl mb-5 flex items-center gap-3">
                  <span className="w-7 h-7 bg-gold text-white flex items-center justify-center text-xs font-medium">3</span>
                  Mode de paiement
                </h2>
                <div className="border-2 border-gold bg-gold/5 p-4 flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full border-2 border-gold bg-gold shrink-0 mt-0.5 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Paiement à la livraison (Cash)</p>
                    <p className="text-lux-gray text-xs mt-1">Vous payez en espèces directement au livreur lors de la réception de votre commande. 100% sécurisé.</p>
                  </div>
                  <span className="text-2xl">💵</span>
                </div>
                <div className="mt-4 p-4 bg-cream border border-lux-border">
                  <p className="text-xs text-lux-gray leading-relaxed">
                    ✓ Aucun paiement en avance requis &nbsp;•&nbsp; ✓ Paiement uniquement à la réception &nbsp;•&nbsp; ✓ Vérifiez votre colis avant de payer
                  </p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="bg-cream border border-lux-border p-6 sticky top-24">
                <h2 className="font-serif text-lg mb-4">Ma Commande</h2>
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-12 h-12 shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover rounded" sizes="48px" />
                        <span className="absolute -top-1 -right-1 bg-lux-dark text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{item.quantity}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{item.name}</p>
                        <p className="text-xs text-lux-gray mt-0.5">{formatPrice(item.price)}</p>
                      </div>
                      <span className="text-xs font-medium shrink-0">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-lux-border space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-lux-gray">Sous-total</span><span>{formatPrice(total())}</span></div>
                  <div className="flex justify-between"><span className="text-lux-gray">Livraison</span><span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'Gratuite 🎉' : formatPrice(shipping)}</span></div>
                  <div className="flex justify-between font-semibold text-base pt-2 border-t border-lux-border mt-2">
                    <span>Total</span>
                    <span className="font-serif text-gold text-xl">{formatPrice(orderTotal)}</span>
                  </div>
                </div>
                <p className="text-xs text-lux-gray mt-3 text-center">💳 Paiement à la livraison</p>
                <button type="submit" disabled={loading} className="btn-gold w-full justify-center mt-4 disabled:opacity-60">
                  <span>{loading ? 'Traitement...' : `Confirmer — ${formatPrice(orderTotal)}`}</span>
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
