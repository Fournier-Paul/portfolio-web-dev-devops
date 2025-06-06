'use client'

import { useState } from 'react'
import Header from "@/components/Header"
import MobileNav from "@/components/sub-components/MobileNav"
import Hero from "@/components/Hero"
import Projects from "@/components/Projects"
import Footer from "@/components/Footer"
import SkillsCanvas from '@/components/SkillsCanvas'
import SkillCategoryCards from "@/components/SkillCategoryCards"
import Education from "@/components/Education"
import Contact from "@/components/Contact"
import Timeline from "@/components/Timeline"
import { AnimatePresence, motion } from "framer-motion"
import type { Section } from '@/components/sub-components/constants'

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>('home')

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <Hero />
      case 'skills':
        return (
          <>
            <SkillsCanvas />
            <SkillCategoryCards />
          </>
        )
      case 'projects':
        return <Projects />
      case 'experience':
        return <Timeline />
      case 'education':
        return <Education />
      case 'contact':
        return <Contact />
      default:
        return <Hero />
    }
  }

  return (
<>
  <Header
    onSectionChange={setCurrentSection}
    currentSection={currentSection}
  />

  <MobileNav
    onSectionChange={setCurrentSection}
    currentSection={currentSection}
  />

  <MobileNav
    onSectionChange={setCurrentSection}
    currentSection={currentSection}
  />

      <main className="min-h-[92vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
