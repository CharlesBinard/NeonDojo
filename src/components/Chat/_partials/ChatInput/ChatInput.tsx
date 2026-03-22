import type { FormEvent, ChangeEvent } from 'react'
import { Button } from '@/components/ui'
import type { ChatInputProps } from './ChatInput.types'

export const ChatInput = ({ value, onChange, onSubmit, isLoading }: ChatInputProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (value.trim() && !isLoading) {
      onSubmit(value.trim())
      onChange('')
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Ask about Rywoox..."
        disabled={isLoading}
        className="
          flex-1 bg-dark-bg border border-dark-border rounded-xl 
          px-4 py-3 text-white placeholder-gray-500 
          focus:outline-none focus:border-neon-cyan 
          transition-colors disabled:opacity-50
        "
      />
      <Button type="submit" isLoading={isLoading} disabled={!value.trim()}>
        Send
      </Button>
    </form>
  )
}
