'use client'

import { useEffect, useState } from 'react'

export default function ThemeTransitionOverlay() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => {
      setVisible(true)
      setTimeout(() => setVisible(false), 800)
    }

    window.addEventListener('theme-transition-start', handler)
    return () => window.removeEventListener('theme-transition-start', handler)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden">
      <div className="w-full h-full bg-[var(--background)] dark:bg-[var(--foreground)] animate-theme-swipe" />
    </div>
  )
}
