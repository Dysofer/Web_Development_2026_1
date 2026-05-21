import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './SpecsSection.module.css'

const SPECS = [
  { label: 'Drivers', value: '8×', unit: 'full-range' },
  { label: 'Potencia', value: '120', unit: 'W RMS' },
  { label: 'Frecuencia', value: '20Hz', unit: '– 22kHz' },
  { label: 'Conectividad', value: 'Wi-Fi 6', unit: '+ BT 5.3' },
  { label: 'Smart Home', value: 'Matter', unit: '+ Thread' },
  { label: 'Batería', value: '12', unit: 'horas' },
]

export default function SpecsSection() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className={styles.section} id="specs" ref={ref}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className={styles.eyebrow}>Especificaciones</p>
        <h2 className={styles.title}>
          Números que<br />importan
        </h2>
      </motion.div>

      <div className={styles.grid}>
        {SPECS.map((s, i) => (
          <motion.div
            key={s.label}
            className={styles.item}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.08 + 0.2, duration: 0.5 }}
          >
            <p className={styles.specLabel}>{s.label}</p>
            <p className={styles.specValue}>
              {s.value}<span className={styles.unit}> {s.unit}</span>
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
