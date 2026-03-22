import { motion } from 'framer-motion'
import type { HeaderNavProps } from './HeaderNav.types'
import { SECTIONS } from '@/constants/routes.constants'

const navItems: Array<{ id: (typeof SECTIONS)[keyof typeof SECTIONS]; label: string }> = [
  { id: SECTIONS.HERO, label: 'Home' },
  { id: SECTIONS.CHAT, label: 'Chat' },
  { id: SECTIONS.ABOUT, label: 'About' },
  { id: SECTIONS.SKILLS, label: 'Skills' },
  { id: SECTIONS.PROJECTS, label: 'Projects' },
]

export const HeaderNav = ({ activeSection, onNavigate }: HeaderNavProps) => {
  return (
    <nav className="flex gap-1">
      {navItems.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${
              activeSection === item.id
                ? 'bg-neon-cyan/20 text-neon-cyan'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.label}
        </motion.button>
      ))}
    </nav>
  )
}
