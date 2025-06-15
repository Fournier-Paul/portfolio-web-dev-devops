'use client'

import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { useEffect, useState, ElementType } from 'react'

interface SectionTitleProps {
  children: string
  as?: 'h1' | 'h2' // Permet d’utiliser le bon niveau sémantique
  className?: string
}

const letterVariants = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.15,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
}

export default function SectionTitle({
  children,
  as = 'h2',
  className = '',
}: SectionTitleProps) {
  const { resolvedTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    setIsDark(resolvedTheme === 'dark')
  }, [resolvedTheme])

  const letters = children.split('').map((char, i) => ({
    char,
    key: `${char}-${i}`,
  }))

  const Tag: ElementType = motion[as]

  return (
    <Tag
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`text-3xl md:text-5xl font-extrabold text-center inline-flex flex-wrap justify-center gap-0.5 ${className}`}
    >
      {letters.map(({ char, key }, i) => (
        <motion.span
          key={key}
          className={`inline-block ${
            char === ' ' ? 'w-2' : 'cursor-pointer'
          } ${
            isDark
              ? 'text-white'
              : 'text-zinc-800'
          }`}
          variants={letterVariants}
          initial="initial"
          animate={hoveredIndex === i ? 'hover' : 'initial'}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  )
}
