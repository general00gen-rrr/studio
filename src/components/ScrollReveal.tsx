'use client'
import { useEffect, useRef } from 'react'

export default function ScrollReveal({ children, className = '', delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }, delay)
        obs.disconnect()
      }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={className} style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
      {children}
    </div>
  )
}
