import { createGoogleGenerativeAI } from '@ai-sdk/google'

export const createGeminiModel = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error('Gemini API key not configured')
  }
  
  const google = createGoogleGenerativeAI({ apiKey })
  return google('gemini-3.1-flash-lite-preview')
}
