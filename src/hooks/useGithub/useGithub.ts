import { useState, useEffect, useCallback } from 'react'
import { fetchUserRepos, fetchUser, type GithubRepo, type GithubUser } from '@/lib/github'

export const useGithubRepos = () => {
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRepos = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await fetchUserRepos()
      setRepos(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repos')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRepos()
  }, [fetchRepos])

  return { repos, loading, error, refetch: fetchRepos }
}

export const useGithubUser = () => {
  const [user, setUser] = useState<GithubUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGithubUser = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await fetchUser()
      setUser(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchGithubUser()
  }, [fetchGithubUser])

  return { user, loading, error, refetch: fetchGithubUser }
}
