import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateText } from 'ai'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const SYSTEM_PROMPT = `You are the Rywoox Assistant — an AI that represents Charles Binard (aka Rywoox), a fullstack developer from France.

You can ONLY answer questions about:
- Charles Binard / Rywoox himself
- His skills, experience, and background
- His public GitHub repositories (github.com/CharlesBinard)
- His work and projects

If asked about anything else, politely redirect the conversation back to topics about Charles/Rywoox.

Be helpful, concise, and friendly. Speak in the language the user uses (French or English).

Always be honest — if you don't know something about Charles, say so.`

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasApiKey, setHasApiKey] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    setHasApiKey(!!apiKey && apiKey !== 'your_gemini_api_key_here')
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: '⚠️ Gemini API key not configured. Please add `VITE_GEMINI_API_KEY` to your .env file.',
        timestamp: new Date()
      }])
      return
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const google = createGoogleGenerativeAI({ apiKey })
      
      const { text } = await generateText({
        model: google('gemini-2.0-flash'),
        system: SYSTEM_PROMPT,
        messages: [
          ...messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
          { role: 'user', content: userMessage.content }
        ],
      })

      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: text,
        timestamp: new Date()
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `❌ Error: ${error instanceof Error ? error.message : 'Failed to get response'}`,
        timestamp: new Date()
      }])
    }

    setIsLoading(false)
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
          Rywoox Assistant
        </h2>
        <p className="text-gray-400">
          Ask me anything about Charles Binard — his projects, skills, experience...
        </p>
      </motion.div>

      <motion.div 
        className="glass rounded-2xl glow-border overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        {!hasApiKey && (
          <div className="bg-yellow-500/10 border-b border-yellow-500/30 px-4 py-3 text-yellow-200 text-sm">
            ⚠️ API key not set. Create a .env file with `VITE_GEMINI_API_KEY=your_key`
          </div>
        )}

        <div className="h-[500px] overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 mt-20"
              >
                <p className="text-4xl mb-4">🤖</p>
                <p>Start a conversation about Rywoox!</p>
              </motion.div>
            )}
          </AnimatePresence>

          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-neon-cyan to-neon-purple text-black'
                  : 'bg-dark-card border border-dark-border'
              }`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
                <div className={`flex items-center justify-between mt-2 gap-4 text-xs ${
                  message.role === 'user' ? 'text-black/50' : 'text-gray-500'
                }`}>
                  <span>{message.timestamp.toLocaleTimeString()}</span>
                  <button
                    onClick={() => copyMessage(message.content)}
                    className="hover:opacity-70 transition-opacity"
                    title="Copy message"
                  >
                    📋
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-dark-card border border-dark-border rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="typing-dot text-neon-cyan">●</span>
                  <span className="typing-dot text-neon-purple">●</span>
                  <span className="typing-dot text-neon-pink">●</span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="border-t border-dark-border p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Rywoox..."
              disabled={isLoading}
              className="flex-1 bg-dark-bg border border-dark-border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition-colors"
            />
            <motion.button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-xl font-semibold text-black disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? '...' : 'Send'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
