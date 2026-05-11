import { motion } from 'framer-motion'

export function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: 'Mi Perfil de GitHub',
      description: 'Accede a mi perfil de GitHub para ver todos mis proyectos, contribuciones y repositories. Aquí encontrarás el código de mis trabajos en desarrollo web, backend y frontend.',
      tech: ['React', 'Node.js', 'JavaScript', 'Web Development'],
      image: 'GH',
      link: 'https://github.com/Dysofer/Web_Development_2026_1',
    },
    {
      id: 2,
      title: 'Explorar Repositorios',
      description: 'Navega a través de mis repositorios públicos donde encontrarás diversos proyectos de desarrollo web, ejercicios prácticos y proyectos educativos.',
      tech: ['Full-Stack', 'GitHub', 'Open Source', 'Learning'],
      image: 'CODE',
      link: 'https://github.com/Dysofer/Web_Development_2026_1',
    },
    {
      id: 3,
      title: 'Proyectos en Desarrollo',
      description: 'Estoy trabajando constantemente en nuevos proyectos para mejorar mis habilidades en desarrollo web. Consulta mi GitHub para las últimas actualizaciones.',
      tech: ['React', 'Backend', 'Web Design', 'JavaScript'],
      image: 'DEV',
      link: 'https://github.com/Dysofer/Web_Development_2026_1',
    },
    {
      id: 4,
      title: 'Contribuciones Open Source',
      description: 'Participo en proyectos open source y contribuyo a la comunidad de desarrollo. Visita mi GitHub para ver mis contribuciones y participación.',
      tech: ['Open Source', 'Collaboration', 'GitHub', 'Community'],
      image: 'OSS',
      link: 'https://github.com/Dysofer/Web_Development_2026_1',
    },
    {
      id: 5,
      title: 'Desarrollo Full-Stack',
      description: 'Especialmente enfocado en proyectos full-stack donde combino backend y frontend. Puedes ver ejemplos de mis trabajos en mi perfil de GitHub.',
      tech: ['Full-Stack', 'Backend', 'Frontend', 'Databases'],
      image: 'FS',
      link: 'https://github.com/Dysofer/Web_Development_2026_1',
    },
    {
      id: 6,
      title: 'Mi Cartera Web',
      description: 'Este portafolio es un ejemplo de mi trabajo en desarrollo web. Puedes ver el código fuente en mi GitHub y explorar mis otras creaciones.',
      tech: ['React', 'Three.js', 'Tailwind', 'Vercel'],
      image: 'WEB',
      link: 'https://github.com/Dysofer/Web_Development_2026_1',
    },
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
    <section className="relative z-20 min-h-screen py-20 px-4 bg-gradient-to-b from-dark/50 to-dark/0">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-12 font-mono"
        >
          <span className="text-primary">// </span>Mis Proyectos
        </motion.h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="relative bg-secondary/60 backdrop-blur border border-primary/20 p-6 rounded-lg hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                <div className="text-4xl mb-4">{project.image}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-primary/10 text-primary rounded border border-primary/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="text-primary hover:text-accent transition-colors duration-300 font-semibold text-sm"
                >
                  Ver Proyecto →
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
