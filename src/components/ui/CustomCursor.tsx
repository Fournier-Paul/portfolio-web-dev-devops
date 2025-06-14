'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  const [isInteractive, setIsInteractive] = useState(false)
  const [isOverTerminal, setIsOverTerminal] = useState(false)
  const [isOverContactForm, setIsOverContactForm] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const mouse = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const dotPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const isMobileDevice = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
    setIsMobile(isMobileDevice)
  }, [])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  useEffect(() => {
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isOnInteractive = target.closest('a, button, input, textarea, select, [role="button"]')
      const isOnTerminal = target.closest('[data-terminal]')
      const isOnContactForm = target.closest('[data-contact-form]')

      setIsInteractive(!!isOnInteractive)
      setIsOverTerminal(!!isOnTerminal)
      setIsOverContactForm(!!isOnContactForm)
    }

    window.addEventListener('mouseover', handleHover)
    return () => window.removeEventListener('mouseover', handleHover)
  }, [])

  useEffect(() => {
    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b

    const animate = () => {
      dotPos.current.x = mouse.current.x
      dotPos.current.y = mouse.current.y

      ringPos.current.x = lerp(ringPos.current.x, dotPos.current.x, 0.08)
      ringPos.current.y = lerp(ringPos.current.y, dotPos.current.y, 0.08)

      const ringSize = isInteractive ? 45 : 30
      const ringOffset = ringSize / 2
      const dotSize = 6

      const isDark = document.documentElement.classList.contains('dark')
      let color = getComputedStyle(document.body).getPropertyValue('--foreground').trim() || '#000000'

      if (isOverTerminal) {
        color = '#ffffff'
      } else if (isOverContactForm && isDark) {
        color = '#000000'
      }

      if (ringRef.current) {
        ringRef.current.style.width = `${ringSize}px`
        ringRef.current.style.height = `${ringSize}px`
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - ringOffset}px, ${ringPos.current.y - ringOffset}px, 0)`
        ringRef.current.style.borderColor = color
        ringRef.current.style.boxShadow = `0 0 8px ${color}40`
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x - dotSize / 2}px, ${dotPos.current.y - dotSize / 2}px, 0)`
        dotRef.current.style.backgroundColor = color
        dotRef.current.style.boxShadow = `0 0 4px ${color}40`
      }

      requestAnimationFrame(animate)
    }

    animate()
  }, [isInteractive, isOverTerminal, isOverContactForm])

  if (isMobile) return null

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] border rounded-full transition-[width,height] duration-200"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
        style={{ width: '6px', height: '6px' }}
      />
    </>
  )
}
