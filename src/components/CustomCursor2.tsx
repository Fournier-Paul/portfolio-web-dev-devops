'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const mouse = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b

    const animate = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.2)
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.2)

      if (cursorRef.current) {
        const size = isHovering ? 60 : 30
        const offset = size / 2
        cursorRef.current.style.width = `${size}px`
        cursorRef.current.style.height = `${size}px`
        cursorRef.current.style.transform = `translate3d(${pos.current.x - offset}px, ${pos.current.y - offset}px, 0)`
      }

      requestAnimationFrame(animate)
    }

    animate()
  }, [isHovering])

  useEffect(() => {
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"]')
      setIsHovering(!!isInteractive)
    }

    window.addEventListener('mouseover', handleHover)
    return () => window.removeEventListener('mouseover', handleHover)
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none border border-white bg-transparent rounded-full transition-all duration-200 z-50"
      style={{
        width: '30px',
        height: '30px',
        transform: 'translate3d(-9999px, -9999px, 0)',
      }}
    />
  )
}
