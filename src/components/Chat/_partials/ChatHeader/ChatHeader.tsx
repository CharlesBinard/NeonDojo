import { isGeminiConfigured } from '@/config/environment'

export const ChatHeader = () => {
  const hasApiKey = isGeminiConfigured()

  return (
    <div className="border-b border-dark-border px-4 py-3">
      {!hasApiKey && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-4 py-2 text-yellow-200 text-sm mb-3">
          ⚠️ API key not set. Create a .env file with <code className="bg-black/30 px-1 rounded">VITE_GEMINI_API_KEY=your_key</code>
        </div>
      )}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-lg">
          🤖
        </div>
        <div>
          <h3 className="font-semibold text-white">Rywoox Assistant</h3>
          <p className="text-sm text-gray-400">Ask me anything about Charles Binard</p>
        </div>
      </div>
    </div>
  )
}
