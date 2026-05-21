import { motion } from 'framer-motion'
import styles from './HeroSection.module.css'

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  })
}

export default function HeroSection() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.content}>
        <motion.p
          custom={0}
          variants={variants}
          initial="hidden"
          animate="visible"
          className={styles.eyebrow}
        >
          NexCore Audio Intelligence
        </motion.p>

        <motion.h1
          custom={1}
          variants={variants}
          initial="hidden"
          animate="visible"
          className={styles.title}
        >
          Meet<br />
          <span className={styles.accent}>Tanny</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={variants}
          initial="hidden"
          animate="visible"
          className={styles.sub}
        >
          La bocina inteligente que escucha, aprende<br />
          y redefine tu espacio sonoro.
        </motion.p>

        <motion.div
          custom={3}
          variants={variants}
          initial="hidden"
          animate="visible"
          className={styles.actions}
        >
          <a href="#buy" className={styles.btnPrimary}>Comprar ahora</a>
          <a href="#features" className={styles.btnGhost}>Ver más</a>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className={styles.scrollLine} />
        <p>Scroll</p>
      </motion.div>
    </section>
  )
}
