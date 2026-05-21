import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './FeaturesSection.module.css'

const FEATURES = [
  {
    icon: '◈',
    title: 'IA Contextual',
    desc: 'Tanny aprende tus hábitos y anticipa tus comandos. Sin wake words innecesarios.',
    color: 'var(--accent)',
  },
  {
    icon: '◉',
    title: 'Audio 360°',
    desc: 'Ocho drivers de alta fidelidad distribuidos radialmente. Cada rincón suena igual.',
    color: 'var(--accent2)',
  },
  {
    icon: '◍',
    title: 'Hub del Hogar',
    desc: 'Compatible con Matter, Zigbee y Thread. Controla todo tu ecosistema desde Tanny.',
    color: 'var(--accent3)',
  },
  {
    icon: '◌',
    title: 'Privacidad Total',
    desc: 'Chip NPU dedicado para procesamiento local. Tu voz nunca sale de casa.',
    color: 'var(--accent)',
  },
]

export default function FeaturesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className={styles.section} id="features" ref={ref}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className={styles.eyebrow}>Por qué Tanny</p>
        <h2 className={styles.title}>
          Diseñado para<br />
          <span>lo extraordinario</span>
        </h2>
      </motion.div>

      <div className={styles.grid}>
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1 + 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ '--card-accent': f.color }}
          >
            <span className={styles.icon}>{f.icon}</span>
            <h3 className={styles.cardTitle}>{f.title}</h3>
            <p className={styles.cardDesc}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
