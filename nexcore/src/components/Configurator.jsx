import { motion } from 'framer-motion'
import { COLOR_PRESETS } from './TannySpeaker'
import styles from './Configurator.module.css'

const RING_COLORS = {
  midnight: '#4ff8c4',
  void:     '#7b6ffa',
  ember:    '#ff6b6b',
  arctic:   '#4ff8c4',
}

export default function Configurator({ current, onChange }) {
  return (
    <motion.div
      className={styles.wrap}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <p className={styles.label}>Finish</p>
      <div className={styles.swatches}>
        {Object.entries(COLOR_PRESETS).map(([key, val]) => (
          <button
            key={key}
            className={`${styles.swatch} ${current === key ? styles.active : ''}`}
            style={{ '--ring': RING_COLORS[key], '--body': val.body }}
            onClick={() => onChange(key)}
            title={val.name}
          >
            <span className={styles.inner} style={{ background: val.body }} />
            <span className={styles.dot} style={{ background: RING_COLORS[key] }} />
          </button>
        ))}
      </div>
      <p className={styles.name}>{COLOR_PRESETS[current].name}</p>
    </motion.div>
  )
}
