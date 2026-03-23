'use client';

import type { ReactNode } from 'react';

export interface GameOverlayButton {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
}

interface GameOverlayProps {
  title?: string;
  emoji?: string;
  subtitle?: ReactNode;
  score?: number;
  bestScore?: number;
  isNewBest?: boolean;
  buttons: GameOverlayButton[];
  children?: ReactNode;
  variant?: 'start' | 'gameover' | 'win' | 'pause';
  overlayClassName?: string;
}

const variantStyles: Record<string, { titleColor: string; bgClass: string; borderClass: string }> =
  {
    start: {
      titleColor: 'text-neon-cyan',
      bgClass: 'bg-dark-bg/85',
      borderClass: 'border-neon-cyan/20',
    },
    gameover: {
      titleColor: 'text-neon-pink',
      bgClass: 'bg-dark-bg/85',
      borderClass: 'border-neon-pink/20',
    },
    win: {
      titleColor: 'text-neon-green',
      bgClass: 'bg-dark-bg/85',
      borderClass: 'border-green-500/20',
    },
    pause: {
      titleColor: 'text-gray-300',
      bgClass: 'bg-dark-bg/85',
      borderClass: 'border-dark-border',
    },
  };

const buttonVariantStyles: Record<string, { className: string }> = {
  primary: {
    className:
      'bg-neon-cyan/20 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/30 hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]',
  },
  secondary: {
    className: 'bg-dark-card border border-dark-border text-gray-300 hover:bg-dark-card/80',
  },
  danger: {
    className:
      'bg-neon-pink/20 border border-neon-pink text-neon-pink hover:bg-neon-pink/30 hover:shadow-[0_0_20px_rgba(255,55,95,0.3)]',
  },
  success: {
    className: 'bg-green-500/20 border border-green-500 text-green-400 hover:bg-green-500/30',
  },
};

export const GameOverlay = ({
  title,
  emoji,
  subtitle,
  score,
  bestScore,
  isNewBest,
  buttons,
  children,
  variant = 'start',
  overlayClassName = '',
}: GameOverlayProps) => {
  const style = variantStyles[variant] ?? variantStyles.start;

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center ${style.bgClass} rounded-xl ${overlayClassName}`}
    >
      {emoji && <div className="text-5xl mb-4">{emoji}</div>}
      {title && (
        <div
          className={`text-2xl font-bold mb-2 ${style.titleColor} ${variant === 'start' ? 'gradient-text' : ''}`}
        >
          {title}
        </div>
      )}
      {subtitle && <div className="text-gray-400 text-sm mb-6 text-center">{subtitle}</div>}
      {children && <div className="mb-4">{children}</div>}
      {score !== undefined && (
        <div className="text-gray-400 mb-1">
          Score: <span className="text-white font-bold">{score}</span>
        </div>
      )}
      {bestScore !== undefined && (
        <div className="text-gray-500 text-sm mb-2">
          Meilleur: <span className="text-white font-bold">{bestScore}</span>
        </div>
      )}
      {isNewBest && <div className="text-yellow-400 mb-4 text-sm">🎉 NOUVEAU BEST !</div>}
      <div className="flex flex-col gap-2">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.onClick}
            className={`px-8 py-3 rounded-lg font-bold transition-all cursor-pointer ${buttonVariantStyles[btn.variant ?? 'primary'].className}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};
