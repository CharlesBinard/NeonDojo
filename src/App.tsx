import { useState } from 'react'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Chat } from '@/components/Chat'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { SnakeGame } from '@/components/Snake'
import { useChat } from '@/hooks'
import { SECTIONS, type SectionId } from '@/constants/routes.constants'

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>(SECTIONS.HERO)
  const { messages, isLoading, sendMessage, messagesEndRef } = useChat()


  const scrollToSection = (sectionId: SectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header activeSection={activeSection} onNavigate={scrollToSection} />

      <main className="container mx-auto px-4 py-24">
        <section id={SECTIONS.HERO} className="min-h-screen flex items-center justify-center">
          <Hero onStartChat={() => scrollToSection(SECTIONS.CHAT)} onNavigate={scrollToSection} />
        </section>

        <section id={SECTIONS.CHAT} className="py-16">
          <Chat
            messages={messages}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef as React.RefObject<HTMLDivElement | null>}
            onSendMessage={sendMessage}
          />
        </section>

        <section id={SECTIONS.ABOUT} className="py-16">
          <About />
        </section>

        <section id={SECTIONS.SKILLS} className="py-16">
          <Skills />
        </section>

        <section id={SECTIONS.PROJECTS} className="py-16">
          <Projects />
        </section>

        <section id={SECTIONS.GAMES} className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent mb-4">
              🎮 Mini Games
            </h2>
            <p className="text-gray-400">Take a break and have some fun!</p>
          </div>
          <SnakeGame />
        </section>
      </main>

      <footer className="py-8 text-center text-gray-500 border-t border-dark-border">
        <p>Built by Rywoox with React & Gemini</p>
      </footer>
    </div>
  )
}

export default App
