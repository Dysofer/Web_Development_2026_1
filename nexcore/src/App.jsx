import { useState, useEffect, useRef } from 'react'
import { useScrollProgress } from './hooks/useScrollProgress'
import { useCursor } from './hooks/useCursor'
import Scene from './components/Scene'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import SpecsSection from './components/SpecsSection'
import BuySection from './components/BuySection'
import ContactSection from './components/ContactSection'
import Configurator from './components/Configurator'
import styles from './App.module.css'

export default function App() {
  const { progress } = useScrollProgress()
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [colorPreset, setColorPreset] = useState('midnight')

  useCursor()

  useEffect(() => {
    const handleMouse = (e) => {
      setMouseX((e.clientX / window.innerWidth) * 2 - 1)
      setMouseY(-((e.clientY / window.innerHeight) * 2 - 1))
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <>
      {/* Custom cursor elements */}
      <div id="cursor" />
      <div id="cursor-ring" />

      {/* Fixed 3D scene — covers full viewport, stays behind content */}
      <div className={styles.canvasWrap}>
        <Scene
          scrollProgress={progress}
          mouseX={mouseX}
          mouseY={mouseY}
          colorPreset={colorPreset}
        />
      </div>

      {/* Scrollable content layers */}
      <div className={styles.content}>
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <SpecsSection />
        <BuySection />
        <ContactSection />
        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} NexCore. All rights reserved.</p>
          <p className={styles.tagline}>Sound. Intelligence. Redefined.</p>
        </footer>
      </div>

      {/* Color configurator — fixed on the right */}
      <Configurator current={colorPreset} onChange={setColorPreset} />

      {/* Background noise texture */}
      <div className={styles.noise} aria-hidden />
    </>
  )
}
