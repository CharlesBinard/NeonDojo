import { motion, type Variants } from 'framer-motion'
import type { HeroProps } from './Hero.types'
import { Button } from '@/components/ui'
import { SECTIONS } from '@/constants/routes.constants'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export const Hero = ({ onStartChat, onNavigate }: HeroProps) => {
  return (
    <motion.div
      className="text-center max-w-3xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <motion.h1
          className="text-7xl md:text-9xl font-black mb-6 animate-glow bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            type: 'spring',
            stiffness: 100,
            damping: 15,
          }}
        >
          Rywoox
        </motion.h1>

        <motion.div className="space-y-2" variants={itemVariants}>
          <p className="text-xl md:text-2xl text-gray-400">
            Fullstack Developer & Open Source Enthusiast
          </p>
          <p className="text-gray-500 flex items-center justify-center gap-2">
            Based in France 🇫🇷
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={onStartChat} className="animate-pulse-glow text-lg px-10 py-4">
            💬 Chat with Rywoox AI
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="secondary"
            onClick={() => window.open('https://github.com/CharlesBinard', '_blank')}
            className="text-lg px-10 py-4"
          >
            📂 View GitHub
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="secondary"
            onClick={() => onNavigate(SECTIONS.GAMES)}
            className="text-lg px-10 py-4"
          >
            🎮 Play Games
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-20"
        animate={{
          y: [0, -8, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="text-gray-600 text-sm mb-2">Scroll to explore</div>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-2xl text-neon-cyan"
        >
          ↓
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
