import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import styles from './BuySection.module.css'

const PLANS = [
  {
    name: 'Tanny',
    price: '649.000',
    tag: 'Estándar',
    features: ['8 drivers full-range', 'Wi-Fi 6 + Bluetooth 5.3', 'Matter + Thread', '3 acabados'],
    accent: 'var(--accent)',
  },
  {
    name: 'Tanny Pro',
    price: '869.000',
    tag: 'Más popular',
    features: ['8 drivers + 2 tweeters', 'Wi-Fi 6E + BT 5.3', 'Matter + Thread + Zigbee', '4 acabados + custom'],
    accent: 'var(--accent2)',
    featured: true,
  },
]

export default function BuySection() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [added, setAdded] = useState(null)

  const handleBuy = (name) => {
    setAdded(name)
    setTimeout(() => setAdded(null), 2200)
  }

  return (
    <section className={styles.section} id="buy" ref={ref}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className={styles.eyebrow}>Precios</p>
        <h2 className={styles.title}>Elige tu Tanny</h2>
      </motion.div>

      <div className={styles.cards}>
        {PLANS.map((p, i) => (
          <motion.div
            key={p.name}
            className={`${styles.card} ${p.featured ? styles.featured : ''}`}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15 + 0.2, duration: 0.7 }}
            style={{ '--plan-accent': p.accent }}
          >
            {p.featured && <span className={styles.badge}>✦ {p.tag}</span>}
            <h3 className={styles.planName}>{p.name}</h3>
            <div className={styles.price}>
              <span className={styles.currency}>$</span>
              <span className={styles.amount}>{p.price}</span>
              <span className={styles.freq}> COP</span>
            </div>

            <ul className={styles.feats}>
              {p.features.map(f => (
                <li key={f}>
                  <span className={styles.check}>✓</span> {f}
                </li>
              ))}
            </ul>

            <button
              className={styles.btn}
              onClick={() => handleBuy(p.name)}
              disabled={added === p.name}
            >
              <AnimatePresence mode="wait">
                {added === p.name ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    ✓ Añadido al carrito
                  </motion.span>
                ) : (
                  <motion.span
                    key="buy"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    Añadir al carrito
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        ))}
      </div>

      <motion.p
        className={styles.footer}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      >
        Envío gratuito · 2 años de garantía · Devolución en 30 días
      </motion.p>
    </section>
  )
}
