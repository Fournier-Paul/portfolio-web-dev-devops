import { ReactNode } from 'react'
import RootLayoutClient from '../components/layout/RootLayoutClient'

export const metadata = {
  title: "Paul Fournier – Développeur Web & DevOps",
  description: "Portfolio de Paul Fournier : développeur Fullstack et DevOps. Découvrez mes projets, compétences et parcours.",
  openGraph: {
    title: "Paul Fournier – Développeur Web & DevOps",
    description: "Portfolio complet de Paul Fournier. Web, mobile, DevOps, automatisation et plus.",
  icons: {
    icon: '/favicon.ico',
  },
    url: "https://paul-fournier.dev/",
    siteName: "Paul Fournier Portfolio",
    locale: "fr_FR",
    type: "website",
  }
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
