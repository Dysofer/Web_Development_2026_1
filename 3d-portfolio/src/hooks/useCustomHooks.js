import { useEffect, useState } from 'react'

/**
 * Hook para detectar si un elemento está visible en el viewport
 * @param {RefObject} ref - Referencia del elemento
 * @param {Object} options - Opciones de IntersectionObserver
 * @returns {boolean} - Si el elemento está visible
 */
export function useInView(ref, options = {}) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, {
      threshold: 0.1,
      ...options,
    })

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, options])

  return isInView
}

/**
 * Hook para detectar scroll direction (arriba/abajo)
 * @returns {string} - Dirección del scroll ('up' o 'down')
 */
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState('down')
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        setScrollDirection('down')
      } else {
        setScrollDirection('up')
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return scrollDirection
}

/**
 * Hook para obtener posición del mouse
 * @returns {Object} - Posición {x, y} en pixels y normalizada {nx, ny} en -1 a 1
 */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0, nx: 0, ny: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      const nx = (x / window.innerWidth) * 2 - 1
      const ny = -(y / window.innerHeight) * 2 + 1

      setPosition({ x, y, nx, ny })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return position
}

/**
 * Hook para detectar si el dispositivo es mobile
 * @returns {boolean} - Si es dispositivo móvil
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

/**
 * Hook para localStorage con sincronización
 * @param {string} key - Clave de almacenamiento
 * @param {any} initialValue - Valor inicial
 * @returns {[any, Function]} - [valor, setter]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

/**
 * Hook para efectos de parallax
 * @returns {Object} - {offset, speed} para animaciones parallax
 */
export function useParallax() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return {
    offset: scrollY,
    speed: (value) => scrollY * value,
  }
}

/**
 * Hook para debounce
 * @param {Function} callback - Función a ejecutar
 * @param {number} delay - Delay en ms
 * @returns {Function} - Función debounceada
 */
export function useDebounce(callback, delay = 500) {
  const timeoutRef = useState(null)[0]

  return (...args) => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => callback(...args), delay)
  }
}

/**
 * Hook para throttle
 * @param {Function} callback - Función a ejecutar
 * @param {number} delay - Delay en ms
 * @returns {Function} - Función throttleada
 */
export function useThrottle(callback, delay = 500) {
  const lastRunRef = useState(0)[0]
  const timeoutRef = useState(null)[0]

  return (...args) => {
    const now = Date.now()
    const timeSinceLastRun = now - lastRunRef.current

    if (timeSinceLastRun >= delay) {
      callback(...args)
      lastRunRef.current = now
    } else {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(
        () => {
          callback(...args)
          lastRunRef.current = Date.now()
        },
        delay - timeSinceLastRun
      )
    }
  }
}
