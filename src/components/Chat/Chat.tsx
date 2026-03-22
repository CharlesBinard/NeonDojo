import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ChatProps } from './Chat.types'
import { GlassCard } from '@/components/ui'
import { TypingIndicator } from '@/components/ui/TypingIndicator'
import { ChatHeader } from './_partials/ChatHeader'
import { ChatMessage } from './_partials/ChatMessage'
import { ChatInput } from './_partials/ChatInput'

export const Chat = ({ messages, isLoading, messagesEndRef }: ChatProps) => {
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = (message: string) => {
    setInputValue('')
    // Parent handles the actual message sending via onSendMessage prop
    // This component just displays messages and passes input up
    const event = new CustomEvent('chat:send', { detail: { message } })
    window.dispatchEvent(event)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
          Rywoox Assistant
        </h2>
        <p className="text-gray-400">
          Ask me anything about Charles Binard — his projects, skills, experience...
        </p>
      </motion.div>

      <GlassCard glowBorder padding="none" className="overflow-hidden">
        <ChatHeader />

        <div className="h-[500px] overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-gray-500 mt-20"
              >
                <p className="text-4xl mb-4">🤖</p>
                <p>Start a conversation about Rywoox!</p>
              </motion.div>
            )}
          </AnimatePresence>

          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              id={message.id}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
              index={index}
            />
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-dark-card border border-dark-border rounded-2xl px-4 py-3">
                <TypingIndicator />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-dark-border p-4">
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </GlassCard>
    </motion.div>
  )
}
