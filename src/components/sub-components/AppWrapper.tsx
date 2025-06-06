'use client'

import { ReactNode } from 'react'

export default function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
