import { motion } from 'framer-motion'
import type { HeaderLogoProps } from './HeaderLogo.types'

export const HeaderLogo = ({ onClick }: HeaderLogoProps) => {
  return (
    <motion.span
      onClick={onClick}
      className="text-xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent cursor-pointer"
      whileHover={{ scale: 1.05 }}
    >
      Rywoox
    </motion.span>
  )
}
