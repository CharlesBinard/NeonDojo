import type { SectionId } from '@/constants/routes.constants'

export interface HeaderNavProps {
  activeSection: SectionId
  onNavigate: (section: SectionId) => void
}
