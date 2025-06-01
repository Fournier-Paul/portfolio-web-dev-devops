'use client'

import { useTheme } from 'next-themes'
import { ReactNode, useEffect, useState } from 'react'

interface SectionTitleProps {
  children: ReactNode
}

export default function SectionTitle({ children }: SectionTitleProps) {
  const { resolvedTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(resolvedTheme === 'dark')
  }, [resolvedTheme])

  const className = isDark
    ? 'text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(0,191,255,0.3)]'
    : 'text-4xl md:text-5xl font-extrabold text-blue-700'

  return <h2 className={className}>{children}</h2>
}
