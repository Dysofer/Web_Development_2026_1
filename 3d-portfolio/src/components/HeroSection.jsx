import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function HeroSection() {
  const [textIndex, setTextIndex] = useState(0)
  const roles = ['FrontEnd Developer', 'Content Creator', 'Web Engineer']
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])
  
  return (
    <div className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4 font-mono glow-text">
          Dilan Solis Fernandez
        </h1>
        <div className="h-12 md:h-16 flex items-center justify-center">
          <motion.h2
            key={textIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl text-primary font-light"
          >
            {roles[textIndex]}
          </motion.h2>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-12 flex gap-6"
      >
        <button className="px-8 py-3 bg-primary text-dark font-bold rounded-lg hover:bg-accent transition-all duration-300 hover:shadow-lg hover:shadow-primary/50">
          Ver Proyectos
        </button>
        <button className="px-8 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-dark transition-all duration-300">
          Contactar
        </button>
      </motion.div>
      
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8"
      >
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </div>
  )
}
