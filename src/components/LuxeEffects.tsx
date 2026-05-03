'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function LuxeEffects() {
  const pathname = usePathname()

  useEffect(() => {
    // Cursor doré personnalisé
    const cursor = document.createElement('div')
    const cursorDot = document.createElement('div')

    cursor.id = 'luxe-cursor'
    cursorDot.id = 'luxe-cursor-dot'

    Object.assign(cursor.style, {
      position: 'fixed', width: '36px', height: '36px',
      border: '1px solid rgba(200,169,110,0.6)',
      borderRadius: '50%', pointerEvents: 'none', zIndex: '9999',
      transition: 'transform 0.15s ease, opacity 0.3s ease, width 0.3s ease, height 0.3s ease, background 0.3s ease',
      transform: 'translate(-50%,-50%)', top: 0, left: 0, opacity: 0,
    })

    Object.assign(cursorDot.style, {
      position: 'fixed', width: '4px', height: '4px',
      background: 'rgba(200,169,110,0.9)',
      borderRadius: '50%', pointerEvents: 'none', zIndex: '9999',
      transition: 'transform 0.05s ease', transform: 'translate(-50%,-50%)',
      top: 0, left: 0,
    })

    document.body.appendChild(cursor)
    document.body.appendChild(cursorDot)

    let mouseX = 0, mouseY = 0
    let curX = 0, curY = 0

    const move = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.opacity = '1'
      cursorDot.style.left = mouseX + 'px'
      cursorDot.style.top = mouseY + 'px'
    }

    const raf = () => {
      curX += (mouseX - curX) * 0.12
      curY += (mouseY - curY) * 0.12
      cursor.style.left = curX + 'px'
      cursor.style.top = curY + 'px'
      requestAnimationFrame(raf)
    }
    raf()

    const onEnter = () => {
      cursor.style.width = '56px'
      cursor.style.height = '56px'
      cursor.style.background = 'rgba(200,169,110,0.08)'
    }
    const onLeave = () => {
      cursor.style.width = '36px'
      cursor.style.height = '36px'
      cursor.style.background = 'transparent'
    }

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    document.addEventListener('mousemove', move)

    // Page entrance animation
    document.body.style.opacity = '0'
    document.body.style.transition = 'opacity 0.5s ease'
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { document.body.style.opacity = '1' })
    })

    return () => {
      document.removeEventListener('mousemove', move)
      cursor.remove()
      cursorDot.remove()
    }
  }, [pathname])

  return null
}
