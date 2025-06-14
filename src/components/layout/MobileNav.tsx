'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Home, Code, Briefcase, GraduationCap, Laptop, Mail, Sun, Moon, Menu, X
} from 'lucide-react'
import type { Section } from '@/components/ui/constants'
import clsx from "clsx";

interface MobileNavProps {
  onSectionChange: (section: Section) => void
  currentSection: Section
}

export default function MobileNav({ onSectionChange, currentSection }: MobileNavProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const isDark = theme === 'dark'

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const navItems = [
    { label: 'Compétences', section: 'skills' as Section, icon: <Code size={20} /> },
    { label: 'Expérience', section: 'experience' as Section, icon: <Briefcase size={20} /> },
    { label: 'Formation', section: 'education' as Section, icon: <GraduationCap size={20} /> },
    { label: 'Projets', section: 'projects' as Section, icon: <Laptop size={20} /> },
    { label: 'Contact', section: 'contact' as Section, icon: <Mail size={20} /> },
  ]


  return (
    <div className="fixed top-4 right-4 z-[100] md:hidden">
      <div className="flex gap-2 items-center">
        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          aria-label="Changer le thème"
          className="p-2 rounded-full transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                <Sun size={20} className="text-white" />
              </motion.div>
            ) : (
              <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.3 }}>
                <Moon size={20} className="text-zinc-800" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className={clsx(
            "p-2 rounded-full shadow transition-transform duration-200 ease-in-out",
            "hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--highlight]",
            "bg-[--card-bg] text-[--highlight]"
          )}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`fixed top-0 right-0 h-full w-64 z-[100] p-6 flex flex-col gap-4 
                shadow-xl backdrop-blur-md ${
                  isDark ? 'bg-[#0f172a]/95 text-white' : 'bg-white/90 text-black'
                }`}
            >
              <h2 className="text-xl font-bold mb-2 text-[var(--highlight)]">Menu</h2>

              {navItems.map(({ label, section, icon }) => (
                <button
                  key={section}
                  onClick={() => {
                    onSectionChange(section)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 text-base px-4 py-3 rounded-lg transition-all
                    ${currentSection === section
                      ? 'bg-[var(--highlight)] text-white font-semibold'
                      : 'hover:bg-zinc-100 dark:hover:bg-white/10 text-inherit'}
                  `}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
