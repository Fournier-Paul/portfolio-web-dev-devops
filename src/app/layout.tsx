import './globals.css'
import { ReactNode } from 'react'
import { ThemeProvider } from '../components/sub-components/ThemeProvider'
import AppWrapper from '../components/sub-components/AppWrapper'
import ParticlesBackground from '../components/sub-components/ParticlesBackground'
import CustomCursor from '../components/sub-components/CustomCursor'
import { Toaster } from 'react-hot-toast'


export const metadata = {
  title: 'Portfolio - Paul Fournier',
  description: 'Développeur Web / DevOps',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body className="relative min-h-screen overflow-x-hidden">
        <CustomCursor />
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
