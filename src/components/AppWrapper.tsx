'use client'

import CustomCursor from './CustomCursor'
import { ReactNode } from 'react'

export default function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <CustomCursor />
      {children}
    </>
  )
}
