import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui'

const skills = [
  { name: 'React', icon: '⚛️', gradient: 'from-blue-400 to-cyan-400' },
  { name: 'TypeScript', icon: '📘', gradient: 'from-blue-500 to-blue-600' },
  { name: 'Node.js', icon: '🟢', gradient: 'from-green-400 to-green-600' },
  { name: 'Python', icon: '🐍', gradient: 'from-yellow-400 to-yellow-600' },
  { name: 'PostgreSQL', icon: '🐘', gradient: 'from-blue-400 to-indigo-500' },
  { name: 'Docker', icon: '🐳', gradient: 'from-blue-400 to-blue-600' },
  { name: 'TailwindCSS', icon: '🎨', gradient: 'from-cyan-400 to-teal-500' },
  { name: 'Git', icon: '📦', gradient: 'from-orange-400 to-orange-600' },
  { name: 'GraphQL', icon: '🔷', gradient: 'from-pink-400 to-rose-500' },
  { name: 'Redis', icon: '🔴', gradient: 'from-red-400 to-red-600' },
  { name: 'AWS', icon: '☁️', gradient: 'from-orange-400 to-yellow-500' },
  { name: 'Rust', icon: '🦀', gradient: 'from-orange-500 to-red-500' },
]

export const Skills = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
        Tech Stack
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.1, y: -5 }}
          >
            <GlassCard glowBorder className="text-center cursor-pointer group">
              <div
                className={`
                  text-4xl mb-2 mx-auto w-fit rounded-lg p-2
                  bg-gradient-to-br ${skill.gradient}
                  group-hover:animate-bounce transition-all
                `}
              >
                {skill.icon}
              </div>
              <p className="font-medium text-gray-300 group-hover:text-white transition-colors">
                {skill.name}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
