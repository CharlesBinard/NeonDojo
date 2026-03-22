import { motion } from 'framer-motion'
import type { HeaderProps } from './Header.types'
import { HeaderLogo } from './_partials/HeaderLogo'
import { HeaderNav } from './_partials/HeaderNav'
import { SECTIONS } from '@/constants/routes.constants'

export const Header = ({ activeSection, onNavigate }: HeaderProps) => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-dark-border"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          <HeaderLogo onClick={() => onNavigate(SECTIONS.HERO)} />
          <div className="hidden md:block">
            <HeaderNav activeSection={activeSection} onNavigate={onNavigate} />
          </div>
        </div>
      </div>
    </motion.header>
  )
}
