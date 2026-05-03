'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [displayed, setDisplayed] = useState(children)
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle')
  const prevPath = useRef(pathname)

  useEffect(() => {
    if (pathname === prevPath.current) return
    prevPath.current = pathname

    setPhase('out')
    const t1 = setTimeout(() => {
      setDisplayed(children)
      setPhase('in')
    }, 320)
    const t2 = setTimeout(() => setPhase('idle'), 640)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [pathname, children])

  useEffect(() => {
    if (phase === 'idle') return
  }, [phase])

  const styles: Record<string, React.CSSProperties> = {
    idle: { opacity: 1, transform: 'translateY(0px)' },
    out:  { opacity: 0, transform: 'translateY(12px)' },
    in:   { opacity: 0, transform: 'translateY(-8px)' },
  }

  return (
    <div
      style={{
        ...styles[phase],
        transition: 'opacity 0.32s cubic-bezier(0.4,0,0.2,1), transform 0.32s cubic-bezier(0.4,0,0.2,1)',
        willChange: 'opacity, transform',
      }}
    >
      {displayed}
    </div>
  )
}
