'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionDescriptionProps {
  children: ReactNode
  className?: string
}

export default function SectionDescription({
  children,
  className = '',
}: SectionDescriptionProps) {
  return (
    <motion.p
      className={`mt-4 text-[var(--text-main)] text-base md:text-lg ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.p>
  )
}
