import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  toggleCart: () => void
  total: () => number
  count: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => set((s) => {
        const id = String(item.id)
        const ex = s.items.find(i => i.id === id)
        if (ex) return { items: s.items.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i) }
        return { items: [...s.items, { ...item, id, quantity: 1 }] }
      }),
      removeItem: (id) => set((s) => ({ items: s.items.filter(i => i.id !== String(id)) })),
      updateQty: (id, qty) => set((s) => ({
        items: qty <= 0 ? s.items.filter(i => i.id !== String(id)) : s.items.map(i => i.id === String(id) ? { ...i, quantity: qty } : i)
      })),
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'luxe-cart' }
  )
)
