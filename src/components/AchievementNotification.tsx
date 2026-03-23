'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAchievementStore } from '@/stores/achievementStore';
import { ALL_ACHIEVEMENTS } from '@/lib/achievements';

export const AchievementNotification = () => {
  const pendingNotifications = useAchievementStore((s) => s.pendingNotifications);
  const dismissNotification = useAchievementStore((s) => s.dismissNotification);

  const current = pendingNotifications[0];

  useEffect(() => {
    if (!current) return;
    const timer = setTimeout(() => {
      dismissNotification(current);
    }, 4000);
    return () => clearTimeout(timer);
  }, [current, dismissNotification]);

  const achievement = current ? ALL_ACHIEVEMENTS.find((a) => a.id === current) : null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
      <AnimatePresence mode="wait">
        {achievement && (
          <motion.div
            key={current}
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-neon-cyan/50 bg-dark-card/95 backdrop-blur-md shadow-[0_0_40px_rgba(0,245,255,0.3)] pointer-events-auto"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
              className="text-3xl"
            >
              🏆
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xs font-mono text-neon-cyan uppercase tracking-wider">
                Achievement Débloqué !
              </span>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{achievement.emoji}</span>
                <span className="font-bold text-white">{achievement.name}</span>
              </div>
              <span className="text-xs text-gray-400">{achievement.description}</span>
            </div>
            <button
              onClick={() => dismissNotification(current)}
              className="text-gray-500 hover:text-white ml-2 cursor-pointer"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
