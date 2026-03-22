import { motion } from 'framer-motion'
import type { HeroProps } from './Hero.types'
import { Button } from '@/components/ui'
import { TypingIndicator } from '@/components/ui/TypingIndicator'

export const Hero = ({ onStartChat }: HeroProps) => {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <motion.h1
          className="text-7xl md:text-9xl font-black mb-4 animate-glow bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          Rywoox
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-400 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Fullstack Developer & Open Source Enthusiast
        </motion.p>

        <motion.p
          className="text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Based in France 🇫🇷
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button onClick={onStartChat} className="animate-pulse-glow">
          💬 Chat with Rywoox AI
        </Button>

        <Button
          variant="secondary"
          onClick={() => window.open('https://github.com/CharlesBinard', '_blank')}
        >
          📂 View GitHub
        </Button>
      </motion.div>

      <motion.div
        className="mt-16 animate-float"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <TypingIndicator />
      </motion.div>
    </div>
  )
}
