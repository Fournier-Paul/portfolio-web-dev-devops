'use client'

import { ReactNode, useEffect, useState } from 'react'
import '../../app/globals.css'
import CustomCursor from '@/components/ui/CustomCursor'
import TouchFeedback from '@/components/ui/TouchFeedback'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import AppWrapper from '@/components/ui/AppWrapper'
import ParticlesBackground from '@/components/ui/ParticlesBackground'
import { Toaster } from 'react-hot-toast'

export default function RootLayoutClient({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const isMobileDevice = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
    setIsMobile(isMobileDevice)
  }, [])

  if (!isMounted) return null

  return (
    <ThemeProvider>
      {!isMobile && <CustomCursor />}
      {isMobile && <TouchFeedback />}
      <ParticlesBackground />
      <Toaster position="top-right" />
      <div className="relative z-0 min-h-screen theme-container transition-colors duration-1000">
        <AppWrapper>{children}</AppWrapper>
      </div>
    </ThemeProvider>
  )
}
