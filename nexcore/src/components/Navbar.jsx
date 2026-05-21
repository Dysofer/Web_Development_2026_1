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
        <li><a href="#features">Features</a></li>
        <li><a href="#specs">Specs</a></li>
        <li><a href="#buy">Buy</a></li>
        <li><a href="#contact">Contacto</a></li>
      </ul>
      <a href="#buy" className={styles.cta}>Get Tanny</a>
    </motion.nav>
  )
}
