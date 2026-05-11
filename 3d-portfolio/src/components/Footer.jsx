import { motion } from 'framer-motion'
import { SocialIcon } from './SocialIcon'

export function Footer() {
  const socialLinks = [
    { icon: 'GH', label: 'GitHub', url: 'https://github.com/Dysofer' },
    { icon: 'IG', label: 'Instagram', url: 'https://www.instagram.com/dylansf27/' },
    { icon: 'X', label: 'Twitter', url: 'https://x.com/DyWi1S' },
    { icon: 'YT', label: 'YouTube', url: 'https://www.youtube.com/@dywiis' },
  ]
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }
  
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative z-20 bg-dark/80 backdrop-blur border-t border-primary/20 py-12 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {/* About Footer */}
          <motion.div variants={itemVariants}>
            <h3 className="text-primary font-bold mb-4">Dilan Solis Fernandez</h3>
            <p className="text-gray-400 text-sm">
              Estudiante de Ingeniería Multimedia apasionado por el desarrollo web
              y la programación, especializándome en backend y frontend.
            </p>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-primary font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-gray-400 hover:text-primary transition-colors">
                  Sobre mí
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-primary transition-colors">
                  Proyectos
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-primary transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </motion.div>
          
          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-primary font-bold mb-4">Sígueme</h3>
            <div className="flex gap-4">
              {socialLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-primary/30 text-primary hover:bg-primary hover:text-dark transition-all duration-300"
                  title={link.label}
                >
                  <SocialIcon icon={link.icon} label={link.label} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Divider */}
        <div className="border-t border-primary/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <p>© 2026 Dilan Solis Fernandez. Todos los derechos reservados.</p>
            <p className="mt-4 md:mt-0">
              Construido con <span className="text-primary"></span> usando React, Three.js y Vercel
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
