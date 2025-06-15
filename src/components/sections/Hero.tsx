'use client'

import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import TerminalCard from '@/components/ui/TerminalCard'
import SectionTitle from '@/components/ui/SectionTitle'
import SectionDescription from '@/components/ui/SectionDescription'



export default function Hero() {
  const { resolvedTheme } = useTheme()

  const iconSet = resolvedTheme === 'dark' ? 'white' : 'black'
  const iconColor = resolvedTheme === 'dark' ? 'ffffff' : '000000'

  return (
    <section id="home" aria-label="Présentation - Paul Fournier" className="relative z-10 py-32 px-6 flex flex-col items-center gap-12 text-[var(--foreground)]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
      <SectionTitle as="h1">Paul Fournier</SectionTitle>

        <SectionDescription>Full Stack Developer / DevOps</SectionDescription>

        <div className="mt-6 flex justify-center gap-6">
          <a
            href="https://github.com/paulfournier"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-transform hover:scale-110"
          >
            <img
              src={`https://cdn.simpleicons.org/github/${iconColor}`}
              alt="GitHub"
              className="w-8 h-8"
            />
          </a>

          <a href="https://linkedin.com/in/paul-fournier-dev" target="_blank" rel="noopener noreferrer">
            <img
              src={`/images/icons/linkedin-${iconSet}.svg`}
              alt="LinkedIn"
              className="w-8 h-8 transition-transform hover:scale-110"
            />
          </a>

          <a href="mailto:contact@paulfournier.dev">
            <img
              src={`/images/icons/mail-${iconSet}.svg`}
              alt="Mail"
              className="w-8 h-8 transition-transform hover:scale-110"
            />
          </a>
        </div>
          <div className="mt-6 flex justify-center">
            <a
              href="/docs/CV-Paul-Fournier-Développeur-Web.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold shadow-md transition-all hover:brightness-110 hover:scale-105  
              ${isDark
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-black text-white hover:bg-gray-800"
              style={{
                backgroundColor: 'var(--highlight)',
                
              }}
              aria-label="Télécharger mon CV"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
            </svg>
            Télécharger mon CV
          </a>

          </div>
        
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="w-full flex justify-center"
      >
        <TerminalCard />
      </motion.div>
    </section>
  )
}
