'use client';

import { motion } from 'framer-motion';
import { ALL_ACHIEVEMENTS, type AchievementId } from '@/lib/achievements';
import { useAchievementStore } from '@/stores/achievementStore';

interface AchievementBadgeProps {
  id: AchievementId;
  showDescription?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'p-3 gap-2 text-sm',
  md: 'p-4 gap-3 text-base',
  lg: 'p-5 gap-3 text-lg',
};

const emojiSizes = {
  sm: 'text-2xl',
  md: 'text-3xl',
  lg: 'text-4xl',
};

export const AchievementBadge = ({
  id,
  showDescription = true,
  size = 'md',
}: AchievementBadgeProps) => {
  const achievement = ALL_ACHIEVEMENTS.find((a) => a.id === id);
  const unlockedAt = useAchievementStore((s) => s.unlockedAt[id]);
  const isUnlocked = !!unlockedAt;

  if (!achievement) return null;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: isUnlocked ? 1 : 0.5 }}
      whileHover={isUnlocked ? { scale: 1.05 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`
        flex flex-col items-center text-center rounded-2xl border transition-all
        ${sizeClasses[size]}
        ${
          isUnlocked
            ? 'bg-dark-card border-dark-border shadow-[0_0_20px_rgba(0,245,255,0.15)]'
            : 'bg-dark-bg border-dark-border grayscale'
        }
      `}
    >
      <motion.div
        animate={isUnlocked ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
        className={`${emojiSizes[size]} ${!isUnlocked ? 'grayscale opacity-60' : ''}`}
      >
        {achievement.emoji}
      </motion.div>
      <div className={`font-bold text-white ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
        {achievement.name}
      </div>
      {showDescription && (
        <div
          className={`text-gray-500 ${size === 'sm' ? 'text-xs' : 'text-xs'} leading-tight`}
        >
          {achievement.description}
        </div>
      )}
      {isUnlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-neon-cyan/60 text-xs font-mono mt-1"
        >
          ✓
        </motion.div>
      )}
    </motion.div>
  );
};
