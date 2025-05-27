'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import TerminalCard from './TerminalCard'

const letters = ['P', 'a', 'u', 'l']

const letterVariants = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.3,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

export default function Hero() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row items-center justify-center min-h-[80vh] bg-[var(--background)] text-[var(--foreground)] transition-colors duration-1000 px-4 md:px-12 gap-10 relative z-10"
    >
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
          Salut, je suis{' '}
          <span className="inline-flex gap-1 text-primary">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block cursor-pointer"
                variants={letterVariants}
                initial="initial"
                animate={hoveredIndex === i ? 'hover' : 'initial'}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </h2>

        <p className="mt-6 text-lg text-muted-foreground max-w-xl">
          Développeur Web passionné par les interfaces <strong>modernes</strong>, <strong>performantes</strong> et{' '}
          <strong>élégantes</strong>.
        </p>
      </div>

      <div className="flex-1 flex justify-center md:justify-end w-full">
        <TerminalCard />
      </div>
    </motion.section>
  )
}
