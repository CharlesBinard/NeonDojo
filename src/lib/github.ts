import { GITHUB_USERNAME, GITHUB_API_URL, GITHUB_REPOS_PER_PAGE } from '@/constants/github.constants'

export interface GithubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  topics: string[]
  homepage: string | null
}

export interface GithubUser {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  html_url: string
  followers: number
  following: number
  public_repos: number
}

export const fetchUserRepos = async (): Promise<GithubRepo[]> => {
  const response = await fetch(
    `${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${GITHUB_REPOS_PER_PAGE}&type=public`
  )
  
  if (!response.ok) {
    throw new Error(`Failed to fetch repos: ${response.statusText}`)
  }
  
  return response.json()
}

export const fetchUser = async (): Promise<GithubUser> => {
  const response = await fetch(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}`)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`)
  }
  
  return response.json()
}
