import { motion } from 'framer-motion'

interface HeroProps {
  onStartChat: () => void
}

export default function Hero({ onStartChat }: HeroProps) {
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
        <motion.button
          onClick={onStartChat}
          className="px-8 py-4 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-xl font-semibold text-black animate-pulse-glow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          💬 Chat with Rywoox AI
        </motion.button>
        
        <motion.button
          onClick={() => window.open('https://github.com/CharlesBinard', '_blank')}
          className="px-8 py-4 glass glow-border rounded-xl font-semibold text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📂 View GitHub
        </motion.button>
      </motion.div>

      <motion.div
        className="mt-16 animate-float"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="inline-flex gap-2 text-gray-500">
          <span className="typing-dot">●</span>
          <span className="typing-dot">●</span>
          <span className="typing-dot">●</span>
        </div>
      </motion.div>
    </div>
  )
}
