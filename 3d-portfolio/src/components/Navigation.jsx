import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navigation() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const sections = [
    { id: 'hero', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'Sobre mí', icon: '👨‍💻' },
    { id: 'projects', label: 'Proyectos', icon: '🚀' },
    { id: 'contact', label: 'Contacto', icon: '💬' },
  ]
  
  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark/80 backdrop-blur-md border-b border-primary/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold font-mono glow-text cursor-pointer"
          onClick={() => handleNavClick('hero')}
        >
          &lt;CD /&gt;
        </motion.div>
        
        {/* Menu Links */}
        <div className="hidden md:flex gap-8">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => handleNavClick(section.id)}
              className={`text-sm font-semibold transition-all duration-300 ${
                activeSection === section.id
                  ? 'text-primary glow-text'
                  : 'text-gray-400 hover:text-primary'
              }`}
              whileHover={{ scale: 1.1 }}
            >
              {section.label}
            </motion.button>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-primary text-2xl">☰</button>
        </div>
      </div>
    </motion.nav>
  )
}
