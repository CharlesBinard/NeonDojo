import { motion } from 'framer-motion'

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'chat', label: 'Chat' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
]

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-dark-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.span 
            className="text-xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveSection('hero')}
          >
            Rywoox
          </motion.span>
          
          <div className="flex gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-neon-cyan/20 text-neon-cyan'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
