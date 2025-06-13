'use client'

import { ReactNode, useEffect, useState } from 'react'
import '../app/globals.css'
import CustomCursor from './sub-components/CustomCursor'
import TouchFeedback from './sub-components/TouchFeedback'
import { ThemeProvider } from './sub-components/ThemeProvider'
import AppWrapper from './sub-components/AppWrapper'
import ParticlesBackground from './sub-components/ParticlesBackground'
import { Toaster } from 'react-hot-toast'

export default function RootLayoutClient({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const isMobileDevice = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
    setIsMobile(isMobileDevice)
  }, [])

  return (
    <>
      {!isMobile && <CustomCursor />}
      {isMobile && <TouchFeedback />}
      <ThemeProvider>
        <ParticlesBackground />
        <Toaster position="top-right" />
        <div className="relative z-0 min-h-screen bg-[var(--background)] dark:bg-[#020617] text-[var(--text-main)] dark:text-[#ededed] transition-colors duration-1000">
          <AppWrapper>{children}</AppWrapper>
        </div>
      </ThemeProvider>
    </>
  )
}
