import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui'

const tags = ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker']

export const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
        About Me
      </h2>

      <GlassCard glowBorder padding="lg">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <motion.div
            className="w-48 h-48 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple p-1 animate-pulse-glow shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center text-6xl">
              👨‍💻
            </div>
          </motion.div>

          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">Charles Binard</h3>
            <p className="text-gray-400 mb-4">
              Passionate fullstack developer from France 🇫🇷. I love building open source projects,
              exploring new technologies, and creating impactful digital experiences.
            </p>
            <p className="text-gray-400">
              When I'm not coding, you'll find me tinkering with new frameworks, contributing to
              open source, or diving into the latest tech trends.
            </p>

            <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-neon-cyan/10 text-neon-cyan rounded-full text-sm border border-neon-cyan/30"
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
