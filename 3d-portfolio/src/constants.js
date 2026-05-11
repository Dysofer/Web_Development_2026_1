// Colores del tema
export const THEME = {
  primary: '#00d9ff',
  secondary: '#1a1a2e',
  accent: '#ff006e',
  dark: '#0f0f1e',
  light: '#e0e0e0',
  muted: '#999999',
}

// Duración de animaciones (ms)
export const ANIMATION_DURATION = {
  short: 300,
  medium: 500,
  long: 800,
  verylng: 1200,
}

// Información del portafolio
export const PORTFOLIO_INFO = {
  name: 'Dylan Sotomayor',
  title: 'Full-Stack Web Developer',
  description: 'Estudiante de Ingeniería Multimedia apasionado por el desarrollo web',
  email: 'dylan@example.com',
  location: 'Colombia',
  yearsExperience: 1,
}

// Redes sociales
export const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    icon: 'GH',
    url: 'https://github.com/Dysofer',
    color: '#fff',
  },
  {
    name: 'Instagram',
    icon: 'IG',
    url: 'https://www.instagram.com/dylansf27/',
    color: '#E4405F',
  },
  {
    name: 'Twitter',
    icon: 'X',
    url: 'https://x.com/DyWi1S',
    color: '#000',
  },
  {
    name: 'YouTube',
    icon: 'YT',
    url: 'https://www.youtube.com/@dywiis',
    color: '#FF0000',
  },
]

// Mensajes de la aplicación
export const MESSAGES = {
  success: {
    form: '✓ ¡Mensaje enviado correctamente!',
    copy: '✓ ¡Copiado al portapapeles!',
  },
  error: {
    form: '✗ Error al enviar el mensaje',
    network: '✗ Error de conexión',
  },
  loading: {
    form: 'Enviando...',
    project: 'Cargando proyecto...',
  },
}

// Breakpoints responsive
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
}

// URLs útiles
export const URLS = {
  github: 'https://github.com/tu-usuario/3d-portfolio',
  resume: '/resume.pdf',
  contact: 'mailto:hello@example.com',
}

// Configuración de Three.js
export const THREE_CONFIG = {
  canvas: {
    dpr: [1, 2],
    gl: {
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    },
  },
  camera: {
    position: [0, 0, 8],
    fov: 75,
    near: 0.1,
    far: 1000,
  },
  lights: {
    ambient: 0.6,
    point1: { position: [10, 10, 10], intensity: 1.2, color: '#00d9ff' },
    point2: { position: [-10, -10, 5], intensity: 0.8, color: '#ff006e' },
  },
  stars: {
    radius: 100,
    depth: 50,
    count: 5000,
    factor: 4,
    saturation: 0,
    fade: true,
    speed: 1,
  },
}

// Configuración de performance
export const PERFORMANCE = {
  enableStats: false, // Mostrar stats de FPS
  targetFPS: 60,
  minFPS: 30,
  maxDrawCalls: 1000,
}
