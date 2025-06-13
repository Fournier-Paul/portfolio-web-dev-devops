'use client'

import { ReactNode, useEffect, useState } from 'react'
import '../app/globals.css?v=2'
import CustomCursor from './sub-components/CustomCursor'
import TouchFeedback from './sub-components/TouchFeedback'
import { ThemeProvider } from './sub-components/ThemeProvider'
import AppWrapper from './sub-components/AppWrapper'
import ParticlesBackground from './sub-components/ParticlesBackground'
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
      <div className="relative z-0 min-h-screen bg-[var(--background)] text-[var(--text-main)] transition-colors duration-1000">
        <AppWrapper>{children}</AppWrapper>
      </div>
    </ThemeProvider>
  )
}
