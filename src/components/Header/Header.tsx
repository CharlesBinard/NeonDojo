import { motion } from 'framer-motion'
import type { HeaderProps } from './Header.types'
import { HeaderLogo } from './_partials/HeaderLogo'
import { HeaderNav } from './_partials/HeaderNav'
import { SECTIONS } from '@/constants/routes.constants'

export const Header = ({ activeSection, onNavigate }: HeaderProps) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-dark-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <HeaderLogo onClick={() => onNavigate(SECTIONS.HERO)} />
          <HeaderNav activeSection={activeSection} onNavigate={onNavigate} />
        </div>
      </div>
    </motion.header>
  )
}
