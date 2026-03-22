export interface ChatProps {
  onSendMessage: (message: string) => void
  messages: Array<{
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }>
  isLoading: boolean
  messagesEndRef: React.RefObject<HTMLDivElement | null>
}
