import { useState, useEffect } from 'react'
import { useStore } from './store'
import { Scene3D } from './components/Scene3D'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactSection } from './components/ContactSection'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const { isFormSubmitted } = useStore()
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'contact']
      
      for (let section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Si la sección está visible en el viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <div className="w-full min-h-screen bg-dark overflow-x-hidden">
      {/* Navegación */}
      <Navigation />
      
      {/* Contenido principal */}
      <main>
        {/* Hero Section */}
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
          {activeSection === 'hero' && <Scene3D activeSection={activeSection} />}
          <HeroSection />
        </section>

        {/* About Section */}
        <section id="about">
          <AboutSection />
        </section>
        
        {/* Projects Section */}
        <section id="projects">
          <ProjectsSection />
        </section>
        
        {/* Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Toast de confirmación */}
      {isFormSubmitted && (
        <div className="fixed bottom-8 right-8 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          ✓ ¡Mensaje enviado correctamente!
        </div>
      )}
    </div>
  )
}

export default App
