import type { ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AnimatePresence mode="wait">
      {children}
    </AnimatePresence>
  )
}
