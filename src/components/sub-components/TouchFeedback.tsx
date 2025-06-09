'use client'

import { useEffect, useState } from 'react'

export default function TouchFeedback() {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const isMobileDevice = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
    setIsMobile(isMobileDevice)
  }, [])

  useEffect(() => {
    if (!isMobile) return

    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0]
      const id = Date.now()

      setRipples((prev) => [...prev, { x: touch.clientX, y: touch.clientY, id }])

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id))
      }, 500)
    }

    window.addEventListener('touchstart', handleTouch)
    return () => window.removeEventListener('touchstart', handleTouch)
  }, [isMobile])

  if (!isMobile) return null

  return (
    <>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="fixed z-[9999] pointer-events-none w-20 h-20 rounded-full bg-black/10 dark:bg-white/20 animate-ripple"
          style={{
            top: ripple.y - 40,
            left: ripple.x - 40,
          }}
        />
      ))}
    </>
  )
}
