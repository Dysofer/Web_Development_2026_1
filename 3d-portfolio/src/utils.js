/**
 * Clasifica un string de clases condicionalmente
 * @param {...any} classes - Clases a unificar
 * @returns {string} - String de clases unificado
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Formatea un número como moneda
 * @param {number} value - Valor a formatear
 * @param {string} currency - Código de moneda (ej: USD)
 * @returns {string} - Valor formateado
 */
export function formatCurrency(value, currency = 'USD') {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
  }).format(value)
}

/**
 * Formatea una fecha
 * @param {Date|string} date - Fecha a formatear
 * @param {object} options - Opciones de formato
 * @returns {string} - Fecha formateada
 */
export function formatDate(date, options = {}) {
  const defaultOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }
  return new Date(date).toLocaleDateString('es-ES', defaultOptions)
}

/**
 * Debounce una función
 * @param {Function} func - Función a debounce
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} - Función debounceada
 */
export function debounce(func, wait = 500) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle una función
 * @param {Function} func - Función a throttle
 * @param {number} limit - Límite de tiempo en ms
 * @returns {Function} - Función throttleada
 */
export function throttle(func, limit = 500) {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Detección de soporte WebGL
 * @returns {boolean} - Si WebGL está soportado
 */
export function hasWebGLSupport() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch (e) {
    return false
  }
}

/**
 * Obtiene información del dispositivo
 * @returns {object} - Información del dispositivo
 */
export function getDeviceInfo() {
  const ua = navigator.userAgent

  return {
    isMobile: /Mobile|Android|iPhone/.test(ua),
    isTablet: /iPad|Android(?!.*Mobi)/.test(ua),
    isDesktop: !(/Mobile|Android|iPhone|iPad/.test(ua)),
    browser: getBrowser(ua),
    os: getOS(ua),
  }
}

/**
 * Detecta el navegador
 * @param {string} ua - User Agent
 * @returns {string} - Nombre del navegador
 */
function getBrowser(ua) {
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Safari')) return 'Safari'
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Edge')) return 'Edge'
  return 'Unknown'
}

/**
 * Detecta el sistema operativo
 * @param {string} ua - User Agent
 * @returns {string} - Nombre del SO
 */
function getOS(ua) {
  if (ua.includes('Windows')) return 'Windows'
  if (ua.includes('Mac')) return 'MacOS'
  if (ua.includes('Linux')) return 'Linux'
  if (ua.includes('Android')) return 'Android'
  if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS'
  return 'Unknown'
}

/**
 * Copia texto al portapapeles
 * @param {string} text - Texto a copiar
 * @returns {Promise<boolean>} - Si se copió exitosamente
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Error al copiar:', err)
    return false
  }
}

/**
 * Descarga un archivo
 * @param {string} url - URL del archivo
 * @param {string} filename - Nombre del archivo
 */
export function downloadFile(url, filename) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} - Si es un email válido
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Genera un ID único
 * @returns {string} - ID único
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Convierte segundos a formato mm:ss
 * @param {number} seconds - Segundos
 * @returns {string} - Formato mm:ss
 */
export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

/**
 * Calcula el contraste de color (para accesibilidad)
 * @param {string} hex - Color en hex
 * @returns {string} - 'light' o 'dark'
 */
export function getTextContrast(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 155 ? 'dark' : 'light'
}

/**
 * Suaviza valores entre 0 y 1 (easing)
 * @param {number} t - Valor entre 0 y 1
 * @returns {number} - Valor suavizado
 */
export function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/**
 * Interpola entre dos valores
 * @param {number} start - Valor inicial
 * @param {number} end - Valor final
 * @param {number} t - Factor de interpolación (0-1)
 * @returns {number} - Valor interpolado
 */
export function lerp(start, end, t) {
  return start + (end - start) * t
}
