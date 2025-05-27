import './globals.css'
import { ReactNode } from 'react'
import { ThemeProvider } from '../components/ThemeProvider'
import AppWrapper from '../components/AppWrapper'

export const metadata = {
  title: 'Portfolio - Paul Fournier',
  description: 'Développeur Web / DevOps',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="relative z-10">
          <AppWrapper>{children}</AppWrapper>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
