export const environment = {
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY as string | undefined,
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
} as const

export const isGeminiConfigured = (): boolean => {
  return !!environment.geminiApiKey && environment.geminiApiKey !== 'your_gemini_api_key_here'
}
