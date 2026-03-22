import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui'

const tags = ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker']

export const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
        About Me
      </h2>

      <GlassCard glowBorder padding="lg">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <motion.div
            className="w-40 h-40 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple p-1 shrink-0 relative"
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center text-6xl">
              👨‍💻
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 animate-pulse" />
          </motion.div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Charles Binard</h3>
              <p className="text-neon-cyan text-sm">Fullstack Developer</p>
            </div>
            
            <p className="text-gray-400 leading-relaxed">
              Passionate fullstack developer from France 🇫🇷. I love building open source projects,
              exploring new technologies, and creating impactful digital experiences.
            </p>
            <p className="text-gray-400 leading-relaxed">
              When I'm not coding, you'll find me tinkering with new frameworks, contributing to
              open source, or diving into the latest tech trends.
            </p>

            <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 bg-neon-cyan/10 text-neon-cyan rounded-full text-sm border border-neon-cyan/30 hover:bg-neon-cyan/20 hover:border-neon-cyan/50 transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
