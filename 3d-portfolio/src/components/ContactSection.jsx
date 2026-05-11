import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store'

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setIsFormSubmitted } = useStore()
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulación de envío
    setTimeout(() => {
      console.log('Mensaje enviado:', formData)
      setIsFormSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setIsSubmitting(false)
      
      // Resetear el estado después de 3 segundos
      setTimeout(() => {
        setIsFormSubmitted(false)
      }, 3000)
    }, 1500)
  }
  
  return (
    <section className="relative z-20 min-h-screen py-20 px-4 flex items-center">
      <div className="max-w-3xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-8 font-mono text-center"
        >
          <span className="text-primary">// </span>¿Hablamos?
        </motion.h2>
        
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-secondary/60 backdrop-blur border border-primary/20 p-8 rounded-lg"
        >
          <div className="mb-6">
            <label className="block text-sm font-semibold text-primary mb-2">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-dark/50 border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-all duration-300"
              placeholder="Tu nombre"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-primary mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-dark/50 border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-all duration-300"
              placeholder="tu@email.com"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-primary mb-2">Mensaje</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 bg-dark/50 border border-primary/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-all duration-300 resize-none"
              placeholder="Tu mensaje..."
            />
          </div>
          
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-primary text-dark font-bold rounded-lg hover:bg-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
          </motion.button>
        </motion.form>
        
        {/* Mensaje de éxito */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-400 text-sm">
            💬 Puedes contactarme también en:{' '}
            <span className="text-primary font-semibold">dylansofer@gmail.com</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
