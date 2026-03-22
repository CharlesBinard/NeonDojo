export const SECTIONS = {
  HERO: 'hero',
  CHAT: 'chat',
  ABOUT: 'about',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  GAMES: 'games',
} as const

export type SectionId = (typeof SECTIONS)[keyof typeof SECTIONS]
