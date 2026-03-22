'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

const CELL_SIZE = 20
const GRID_WIDTH = 20
const GRID_HEIGHT = 16
const INITIAL_SPEED = 150

type Position = { x: number; y: number }
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 8 },
  { x: 9, y: 8 },
  { x: 8, y: 8 },
]

const getRandomFood = (snake: Position[]): Position => {
  let food: Position
  do {
    food = {
      x: Math.floor(Math.random() * GRID_WIDTH),
      y: Math.floor(Math.random() * GRID_HEIGHT),
    }
  } while (snake.some((s) => s.x === food.x && s.y === food.y))
  return food
}

export const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>(getRandomFood(INITIAL_SNAKE))
  const [direction, setDirection] = useState<Direction>('RIGHT')
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const directionRef = useRef<Direction>(direction)

  useEffect(() => {
    directionRef.current = direction
  }, [direction])

  const resetGame = useCallback(() => {
    const newSnake = INITIAL_SNAKE.map((s) => ({ ...s }))
    setSnake(newSnake)
    setFood(getRandomFood(newSnake))
    setDirection('RIGHT')

    directionRef.current = 'RIGHT'
    setScore(0)
    setGameOver(false)
    setIsPlaying(false)
    setGameStarted(false)
  }, [])

  const startGame = useCallback(() => {
    resetGame()
    setIsPlaying(true)
    setGameStarted(true)
  }, [resetGame])

  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] }
      const dir = directionRef.current

      switch (dir) {
        case 'UP':
          head.y -= 1
          break
        case 'DOWN':
          head.y += 1
          break
        case 'LEFT':
          head.x -= 1
          break
        case 'RIGHT':
          head.x += 1
          break
      }

      // Wall collision
      if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) {
        setGameOver(true)
        setIsPlaying(false)
        setHighScore((prev) => Math.max(prev, score))
        return prevSnake
      }

      // Self collision
      if (prevSnake.some((s) => s.x === head.x && s.y === head.y)) {
        setGameOver(true)
        setIsPlaying(false)
        setHighScore((prev) => Math.max(prev, score))
        return prevSnake
      }

      const newSnake = [head, ...prevSnake]

      // Food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((s) => s + 10)
        setFood(getRandomFood(newSnake))
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [food, score])

  useEffect(() => {
    if (!isPlaying) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
        gameLoopRef.current = null
      }
      return
    }

    const speed = Math.max(60, INITIAL_SPEED - Math.floor(score / 20) * 10)
    gameLoopRef.current = setInterval(moveSnake, speed)

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [isPlaying, moveSnake, score])

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = GRID_WIDTH * CELL_SIZE
    const height = GRID_HEIGHT * CELL_SIZE
    canvas.width = width
    canvas.height = height

    // Background
    ctx.fillStyle = '#0a0a0f'
    ctx.fillRect(0, 0, width, height)

    // Grid dots
    ctx.fillStyle = 'rgba(0, 245, 255, 0.05)'
    for (let x = 0; x < GRID_WIDTH; x++) {
      for (let y = 0; y < GRID_HEIGHT; y++) {
        ctx.beginPath()
        ctx.arc(x * CELL_SIZE + CELL_SIZE / 2, y * CELL_SIZE + CELL_SIZE / 2, 1, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Snake
    snake.forEach((segment, index) => {
      const isHead = index === 0
      const alpha = 1 - index * 0.04

      // Glow
      ctx.shadowBlur = isHead ? 20 : 10
      ctx.shadowColor = isHead ? '#00f5ff' : '#bf5af2'

      // Body
      ctx.fillStyle = isHead
        ? `rgba(0, 245, 255, ${alpha})`
        : `rgba(191, 90, 242, ${alpha})`
      ctx.beginPath()
      ctx.roundRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2,
        isHead ? 6 : 4
      )
      ctx.fill()

      // Eyes on head
      if (isHead) {
        ctx.shadowBlur = 0
        ctx.fillStyle = '#0a0a0f'
        const cx = segment.x * CELL_SIZE + CELL_SIZE / 2
        const cy = segment.y * CELL_SIZE + CELL_SIZE / 2
        const eyeSize = 3
        const eyeOffset = 4

        if (directionRef.current === 'RIGHT') {
          ctx.beginPath(); ctx.arc(cx + eyeOffset, cy - 4, eyeSize, 0, Math.PI * 2); ctx.fill()
          ctx.beginPath(); ctx.arc(cx + eyeOffset, cy + 4, eyeSize, 0, Math.PI * 2); ctx.fill()
        } else if (directionRef.current === 'LEFT') {
          ctx.beginPath(); ctx.arc(cx - eyeOffset, cy - 4, eyeSize, 0, Math.PI * 2); ctx.fill()
          ctx.beginPath(); ctx.arc(cx - eyeOffset, cy + 4, eyeSize, 0, Math.PI * 2); ctx.fill()
        } else if (directionRef.current === 'UP') {
          ctx.beginPath(); ctx.arc(cx - 4, cy - eyeOffset, eyeSize, 0, Math.PI * 2); ctx.fill()
          ctx.beginPath(); ctx.arc(cx + 4, cy - eyeOffset, eyeSize, 0, Math.PI * 2); ctx.fill()
        } else {
          ctx.beginPath(); ctx.arc(cx - 4, cy + eyeOffset, eyeSize, 0, Math.PI * 2); ctx.fill()
          ctx.beginPath(); ctx.arc(cx + 4, cy + eyeOffset, eyeSize, 0, Math.PI * 2); ctx.fill()
        }
      }
    })

    // Food
    ctx.shadowBlur = 15
    ctx.shadowColor = '#ff375f'
    ctx.fillStyle = '#ff375f'
    ctx.beginPath()
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 3,
      0,
      Math.PI * 2
    )
    ctx.fill()

    // Food inner glow
    ctx.shadowBlur = 0
    ctx.fillStyle = 'rgba(255, 55, 95, 0.4)'
    ctx.beginPath()
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2 - 2,
      food.y * CELL_SIZE + CELL_SIZE / 2 - 2,
      4,
      0,
      Math.PI * 2
    )
    ctx.fill()

    ctx.shadowBlur = 0
  }, [snake, food])

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isPlaying && e.key !== ' ' && e.key !== 'Enter') return
      if (gameOver) return

      const dirMap: Record<string, Direction> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
        w: 'UP',
        s: 'DOWN',
        a: 'LEFT',
        d: 'RIGHT',
        W: 'UP',
        S: 'DOWN',
        A: 'LEFT',
        D: 'RIGHT',
      }

      const newDir = dirMap[e.key]
      if (!newDir) return

      e.preventDefault()
      const current = directionRef.current
      const opposites: Record<string, string> = {
        UP: 'DOWN',
        DOWN: 'UP',
        LEFT: 'RIGHT',
        RIGHT: 'LEFT',
      }

      if (opposites[newDir] !== current) {
    
        setDirection(newDir)
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isPlaying, gameOver])

  const handleDirectionBtn = (dir: Direction) => {
    if (!isPlaying) return
    const opposites: Record<string, string> = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    }
    if (opposites[dir] !== directionRef.current) {
  
      setDirection(dir)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Score bar */}
      <div className="flex gap-8 text-lg font-mono">
        <div className="text-neon-cyan">
          SCORE <span className="text-white font-bold">{score}</span>
        </div>
        <div className="text-neon-pink">
          BEST <span className="text-white font-bold">{highScore}</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="rounded-xl border border-dark-border"
          style={{ boxShadow: '0 0 40px rgba(0, 245, 255, 0.1)' }}
        />

        {/* Overlay states */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-bg/80 rounded-xl">
            <div className="text-4xl mb-4">🐍</div>
            <div className="text-2xl font-bold text-neon-cyan mb-2">SNAKE</div>
            <div className="text-gray-400 mb-6 text-center px-8">
              Use <span className="text-white">Arrow keys</span> or <span className="text-white">WASD</span> to move
            </div>
            <button
              onClick={startGame}
              className="px-8 py-3 rounded-lg bg-neon-cyan/20 border border-neon-cyan text-neon-cyan font-bold hover:bg-neon-cyan/30 transition-all hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]"
            >
              PRESS TO PLAY
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-bg/80 rounded-xl">
            <div className="text-4xl mb-4">💀</div>
            <div className="text-2xl font-bold text-neon-pink mb-2">GAME OVER</div>
            <div className="text-gray-400 mb-2">Score: <span className="text-white font-bold">{score}</span></div>
            {score >= highScore && score > 0 && (
              <div className="text-neon-pink mb-4 text-sm">🎉 NEW BEST!</div>
            )}
            <button
              onClick={startGame}
              className="px-8 py-3 rounded-lg bg-neon-pink/20 border border-neon-pink text-neon-pink font-bold hover:bg-neon-pink/30 transition-all hover:shadow-[0_0_20px_rgba(255,55,95,0.3)]"
            >
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>

      {/* Mobile controls */}
      <div className="grid grid-cols-3 gap-2 md:hidden">
        <div />
        <button
          onClick={() => handleDirectionBtn('UP')}
          disabled={!isPlaying}
          className="w-14 h-14 rounded-lg bg-dark-card border border-dark-border text-2xl flex items-center justify-center disabled:opacity-30 active:bg-neon-cyan/20"
        >
          ↑
        </button>
        <div />
        <button
          onClick={() => handleDirectionBtn('LEFT')}
          disabled={!isPlaying}
          className="w-14 h-14 rounded-lg bg-dark-card border border-dark-border text-2xl flex items-center justify-center disabled:opacity-30 active:bg-neon-cyan/20"
        >
          ←
        </button>
        <button
          onClick={() => handleDirectionBtn('DOWN')}
          disabled={!isPlaying}
          className="w-14 h-14 rounded-lg bg-dark-card border border-dark-border text-2xl flex items-center justify-center disabled:opacity-30 active:bg-neon-cyan/20"
        >
          ↓
        </button>
        <button
          onClick={() => handleDirectionBtn('RIGHT')}
          disabled={!isPlaying}
          className="w-14 h-14 rounded-lg bg-dark-card border border-dark-border text-2xl flex items-center justify-center disabled:opacity-30 active:bg-neon-cyan/20"
        >
          →
        </button>
      </div>

      <div className="text-gray-600 text-sm hidden md:block">
        Press <span className="text-gray-400">SPACE</span> or <span className="text-gray-400">ENTER</span> to {isPlaying ? 'pause' : 'start'}
      </div>
    </div>
  )
}
