import { motion } from 'framer-motion'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <motion.nav
      className={styles.nav}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href="#" className={styles.logo}>
        NEX<span>CORE</span>
      </a>
      <ul className={styles.links}>
        <li><a href="#features">Características</a></li>
        <li><a href="#specs">Especificaciones</a></li>
        <li><a href="#buy">Comprar</a></li>
        <li><a href="#contact">Contacto</a></li>
      </ul>
      <a href="#buy" className={styles.cta}>Obtener Tanny</a>
    </motion.nav>
  )
}
