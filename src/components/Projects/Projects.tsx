import { motion } from 'framer-motion'
import { useGithubRepos } from '@/hooks'
import { GlassCard } from '@/components/ui'
import { TypingIndicator } from '@/components/ui/TypingIndicator'

export const Projects = () => {
  const { repos, loading, error } = useGithubRepos()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
        Public Projects
      </h2>

      {loading && (
        <div className="flex justify-center py-12">
          <TypingIndicator />
        </div>
      )}

      {error && (
        <GlassCard glowBorder className="text-center text-red-400 py-12">
          Failed to load projects. Please try again later.
        </GlassCard>
      )}

      {!loading && !error && (
        <div className="space-y-4">
          {repos.map((repo, index) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <GlassCard glowBorder className="block group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors mb-2">
                      {repo.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      {repo.description || 'No description provided'}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full bg-neon-cyan" />
                          {repo.language}
                        </span>
                      )}
                      <span>⭐ {repo.stargazers_count}</span>
                      <span>🍴 {repo.forks_count}</span>
                      <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
                    ↗️
                  </span>
                </div>
              </GlassCard>
            </motion.a>
          ))}
        </div>
      )}
    </motion.div>
  )
}
