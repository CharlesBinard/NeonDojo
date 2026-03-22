import { generateText } from 'ai'
import { createGeminiModel } from '@/config/gemini'

export const SYSTEM_PROMPT = `You are the Rywoox Assistant — an AI that represents Charles Binard (aka Rywoox), a fullstack developer from France.

You can ONLY answer questions about:
- Charles Binard / Rywoox himself
- His skills, experience, and background  
- His public GitHub repositories (github.com/CharlesBinard)
- His work and projects

If asked about anything else, politely redirect the conversation back to topics about Charles/Rywoox.

Be helpful, concise, and friendly. Speak in the language the user uses (French or English).

Always be honest — if you don't know something about Charles, say so.`

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export const sendMessageToGemini = async (
  messages: ChatMessage[]
): Promise<string> => {
  try {
    const model = createGeminiModel()
    
    const { text } = await generateText({
      model,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    })
    
    return text
  } catch (error) {
    if (error instanceof Error && error.message === 'Gemini API key not configured') {
      throw error
    }
    throw new Error(
      `Failed to get response: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}
