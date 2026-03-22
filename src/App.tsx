import { useState } from 'react'
import Hero from './components/Hero'
import Chat from './components/Chat'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Navigation from './components/Navigation'

function App() {
  const [activeSection, setActiveSection] = useState('hero')

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="container mx-auto px-4 py-24">
        <section id="hero" className="min-h-screen flex items-center justify-center">
          <Hero onStartChat={() => setActiveSection('chat')} />
        </section>
        
        <section id="chat" className="min-h-screen py-16">
          <Chat />
        </section>
        
        <section id="about" className="py-16">
          <About />
        </section>
        
        <section id="skills" className="py-16">
          <Skills />
        </section>
        
        <section id="projects" className="py-16">
          <Projects />
        </section>
      </main>
      
      <footer className="py-8 text-center text-gray-500 border-t border-dark-border">
        <p>Built by Rywoox with React & Gemini</p>
      </footer>
    </div>
  )
}

export default App
