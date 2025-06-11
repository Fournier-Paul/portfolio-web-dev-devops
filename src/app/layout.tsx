'use client'

import './globals.css'
import { ReactNode, useEffect, useState } from 'react'
import CustomCursor from '../components/sub-components/CustomCursor'
import TouchFeedback from '../components/sub-components/TouchFeedback'
import { ThemeProvider } from '../components/sub-components/ThemeProvider'
import AppWrapper from '../components/sub-components/AppWrapper'
import ParticlesBackground from '../components/sub-components/ParticlesBackground'
import { Toaster } from 'react-hot-toast'

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const isMobileDevice = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
    setIsMobile(isMobileDevice)
  }, [])

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="relative min-h-screen overflow-x-hidden">
        {!isMobile && <CustomCursor />}
        {isMobile && <TouchFeedback />}
        <ThemeProvider>
          <ParticlesBackground />
          <Toaster position="top-right" />
          <div className="relative z-0 min-h-screen dark:bg-[#020617] text-[#171717] dark:text-[#ededed] transition-colors duration-1000">
            <AppWrapper>{children}</AppWrapper>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
