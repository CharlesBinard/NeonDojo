import type { SectionId } from '@/constants/routes.constants'

export interface HeaderProps {
  activeSection: SectionId
  onNavigate: (section: SectionId) => void
}
