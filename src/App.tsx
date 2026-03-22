import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Header } from '@/components/Header'
import { GameHub } from '@/components/GameHub'
import { GameView } from '@/components/GameView'
import type { GameId } from '@/types/games'

function App() {
  const [selectedGame, setSelectedGame] = useState<GameId | null>(null)

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Header />

      <AnimatePresence mode="wait">
        {selectedGame ? (
          <GameView
            key={selectedGame}
            gameId={selectedGame}
            onBack={() => setSelectedGame(null)}
          />
        ) : (
          <GameHub
            key="hub"
            onSelectGame={(id) => setSelectedGame(id)}
          />
        )}
      </AnimatePresence>

      <footer className="py-8 text-center text-gray-600 text-sm font-mono">
        <p>6 mini jeux · React + Canvas · Rywoox</p>
      </footer>
    </div>
  )
}

export default App
