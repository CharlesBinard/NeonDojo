import type { SectionId } from '@/constants/routes.constants'

export interface HeroProps {
  onStartChat: () => void
  onNavigate: (sectionId: SectionId) => void
}
