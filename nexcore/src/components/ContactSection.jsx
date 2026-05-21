import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import styles from './ContactSection.module.css'

const REASONS = [
  'Garantía / Daños',
  'Soporte técnico',
  'Seguimiento de pedido',
  'Otro',
]

export default function ContactSection() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', reason: '', message: '' })
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Requerido'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email inválido'
    if (!form.reason) e.reason = 'Selecciona un motivo'
    if (!form.message.trim() || form.message.length < 10) e.message = 'Mínimo 10 caracteres'
    return e
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: undefined }))
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setSent(true)
    setForm({ name: '', email: '', reason: '', message: '' })
  }

  return (
    <section className={styles.section} id="contact" ref={ref}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className={styles.eyebrow}>Soporte y Contacto</p>
        <h2 className={styles.title}>
          Estamos aquí<br />
          <span>para ayudarte</span>
        </h2>
        <p className={styles.sub}>
          ¿Tu Tanny presenta algún problema? Nuestro equipo técnico especializado
          responde en menos de 24 horas hábiles.
        </p>
      </motion.div>

      <div className={styles.grid}>
        {/* Info cards */}
        <motion.div
          className={styles.info}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {[
            {
              icon: '◈',
              title: 'Garantía NexCore',
              desc: '2 años de garantía oficial. Cubrimos defectos de fabricación, fallas de hardware y reemplazos por daño de componentes internos.',
              accent: 'var(--accent)',
            },
            {
              icon: '◉',
              title: 'Línea directa',
              desc: '+57 (1) 800-NEXCORE\nLunes a viernes · 8am – 6pm',
              accent: 'var(--accent2)',
            },
            {
              icon: '◍',
              title: 'Soporte Express',
              desc: 'Para daños críticos ofrecemos servicio de recogida en domicilio dentro de las principales ciudades de Colombia.',
              accent: 'var(--accent3)',
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className={styles.infoCard}
              style={{ '--card-accent': item.accent }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
            >
              <span className={styles.infoIcon}>{item.icon}</span>
              <div>
                <h4 className={styles.infoTitle}>{item.title}</h4>
                <p className={styles.infoDesc}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          className={styles.formWrap}
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                className={styles.success}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className={styles.successIcon}>✓</span>
                <h3>¡Mensaje recibido!</h3>
                <p>Nuestro equipo de soporte te contactará en menos de 24 horas hábiles al correo registrado.</p>
                <button className={styles.resetBtn} onClick={() => setSent(false)}>
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" className={styles.form} exit={{ opacity: 0 }}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Nombre completo</label>
                    <input
                      className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                      type="text"
                      name="name"
                      placeholder="Tu nombre"
                      value={form.name}
                      onChange={handleChange}
                    />
                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Correo electrónico</label>
                    <input
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      type="email"
                      name="email"
                      placeholder="tu@email.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Motivo de contacto</label>
                  <select
                    className={`${styles.select} ${errors.reason ? styles.inputError : ''}`}
                    name="reason"
                    value={form.reason}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona un motivo...</option>
                    {REASONS.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  {errors.reason && <span className={styles.error}>{errors.reason}</span>}
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Describe el problema</label>
                  <textarea
                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                    name="message"
                    placeholder="Cuéntanos qué está pasando con tu Tanny..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                  />
                  {errors.message && <span className={styles.error}>{errors.message}</span>}
                </div>

                <button className={styles.submitBtn} onClick={handleSubmit}>
                  Enviar mensaje
                  <span className={styles.arrow}>→</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
