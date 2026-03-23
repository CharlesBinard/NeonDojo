'use client';

import { motion } from 'framer-motion';
import { useAudio } from '@/hooks/useAudio';

export const AudioToggle = () => {
  const { enabled, toggle } = useAudio();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className="flex items-center justify-center w-10 h-10 rounded-lg bg-dark-card border border-dark-border hover:border-neon-cyan/50 transition-all cursor-pointer"
      title={enabled ? 'Couper le son' : 'Activer le son'}
    >
      {enabled ? (
        <span className="text-xl">🔊</span>
      ) : (
        <span className="text-xl opacity-60">🔇</span>
      )}
    </motion.button>
  );
};
