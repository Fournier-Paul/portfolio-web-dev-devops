'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Home, Code, Briefcase, GraduationCap, Laptop, Mail, Sun, Moon
} from 'lucide-react'
import type { Section } from '@/components/ui/constants'

interface HeaderProps {
  onSectionChange: (section: Section) => void
  currentSection: Section
}

export default function Header({ onSectionChange, currentSection }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isDark = theme === 'dark'

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const navItems: { label: string; section: Section; icon: React.ReactElement }[] = [
    { label: 'Accueil', section: 'home', icon: <Home size={16} /> },
    { label: 'Compétences', section: 'skills', icon: <Code size={16} /> },
    { label: 'Expérience', section: 'experience', icon: <Briefcase size={16} /> },
    { label: 'Diplômes', section: 'education', icon: <GraduationCap size={16} /> },
    { label: 'Projets', section: 'projects', icon: <Laptop size={16} /> },
    { label: 'Contact', section: 'contact', icon: <Mail size={16} /> },
  ]

  return (
    <header className="w-full justify-center sticky top-4 z-30 px-4 hidden md:flex">
      <div
        className={`nav-gradient-border flex items-center px-4 py-2 gap-2 rounded-full
        backdrop-blur-md transition-all duration-1000
        ${isDark ? 'bg-[#0f172a]/80' : 'bg-white/80'}
      `}
        style={{
          ['--nav-bg' as any]: isDark ? '#0f172a' : '#fafafa',
          ['--nav-gradient-start' as any]: isDark ? '#0d9488' : '#d1d5db',
          ['--nav-gradient-end' as any]: isDark ? '#0d9488' : '#e5e7eb',
        }}
      >
        {navItems.map(({ label, section, icon }) => {
          const isActive = currentSection === section
          return (
      <a
        key={section}
        href={`#${section}`}
        onClick={(e) => {
          e.preventDefault()
          onSectionChange(section)
        }}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-1000 ${
          isActive
            ? isDark
              ? 'bg-zinc-800/80 text-white font-semibold'
              : 'bg-teal-100 text-teal-900 font-semibold'
            : isDark
              ? 'text-zinc-300 hover:bg-white/10'
              : 'text-zinc-700 hover:bg-teal-50 hover:text-teal-900'
        }`}
      >
        {icon}
        <span>{label}</span>
      </a>
          )
        })}

        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          aria-label="Toggle Theme"
          className="ml-2 h-10 w-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Sun size={20} className="text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Moon size={20} className="text-zinc-700" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </header>
  )
}
