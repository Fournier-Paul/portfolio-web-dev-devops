import { ReactNode } from 'react'
import RootLayoutClient from '../components/layout/RootLayoutClient'

export const metadata = {
  title: "Paul Fournier – Développeur Web / DevOps",
  description: "Portfolio de Paul Fournier, développeur fullstack et ingénieur DevOps passionné.",
  icons: {
    icon: '/images/icons/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  )
}
