import { motion } from 'framer-motion'
import { BackButton } from '@/components/ui'
import { SnakeGame, PongGame, MemoryGame, TetrisGame, FlappyGame, TicTacToeGame } from '@/components/games'
import type { GameId } from '@/types/games'
import { GAMES } from '@/data/games'

interface GameViewProps {
  gameId: GameId
  onBack: () => void
}

const gameComponents: Record<GameId, React.ComponentType> = {
  snake: SnakeGame,
  pong: PongGame,
  memory: MemoryGame,
  tetris: TetrisGame,
  flappy: FlappyGame,
  tictactoe: TicTacToeGame,
}

const colorMap: Record<string, string> = {
  cyan: 'neon-cyan',
  purple: 'neon-purple',
  pink: 'neon-pink',
  green: 'text-green-400',
  yellow: 'text-yellow-400',
  orange: 'text-orange-400',
}

export const GameView = ({ gameId, onBack }: GameViewProps) => {
  const game = GAMES.find(g => g.id === gameId)
  const GameComponent = gameComponents[gameId]
  const colorClass = colorMap[game?.hue ?? 'cyan'] || 'neon-cyan'

  return (
    <motion.div
      key={gameId}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="min-h-screen py-24"
    >
      <div className="container mx-auto px-4 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="text-5xl mb-2">{game?.emoji}</div>
          <h1 className={`text-3xl font-black ${colorClass}`}>{game?.name}</h1>
          <p className="text-gray-500 text-sm">{game?.description}</p>
        </div>

        <GameComponent />

        <BackButton onClick={onBack} />
      </div>
    </motion.div>
  )
}
