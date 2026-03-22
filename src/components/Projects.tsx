import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://api.github.com/users/CharlesBinard/repos?sort=updated&per_page=12')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch repos')
        return res.json()
      })
      .then(data => {
        setRepos(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

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
          <div className="flex gap-2">
            <span className="typing-dot text-neon-cyan">●</span>
            <span className="typing-dot text-neon-purple">●</span>
            <span className="typing-dot text-neon-pink">●</span>
          </div>
        </div>
      )}
      
      {error && (
        <div className="text-center text-red-400 py-12">
          Failed to load projects. Please try again later.
        </div>
      )}
      
      {!loading && !error && (
        <div className="grid gap-4">
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
              className="glass rounded-xl p-6 glow-border block group"
            >
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
                        <span className="w-3 h-3 rounded-full bg-neon-cyan"></span>
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
            </motion.a>
          ))}
        </div>
      )}
    </motion.div>
  )
}
