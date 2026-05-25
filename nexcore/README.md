# NexCore — Tanny Smart Speaker

> SPA desarrollada como Parcial Final de Desarrollo Web  
> Desarrollado por: Dilan Solis - Elian Herrera - Grecia Garcia - Javier Sandoval
> Temática: **Tecnología** · Producto: Bocina inteligente **Tanny** de **NexCore**

## Demo
[Ver en Vercel →](https://web-development-2026-1-xxul.vercel.app/)

## Concepto del Producto

**Tanny** es la bocina inteligente de **NexCore**: un dispositivo de audio premium con IA contextual integrada que aprende los hábitos del usuario, controla el ecosistema del hogar inteligente (Matter, Thread, Zigbee) y procesa los comandos de voz localmente para garantizar privacidad total. Disponible en cuatro acabados: Midnight, Void, Ember y Arctic.

## Requerimientos del Parcial

### A. Escena 3D Interactiva (React Three Fiber)
- **Visualización de Producto:** Bocina Tanny construida con primitivas Three.js (8 componentes: cuerpo, rejilla, LED ring, botones)
- **Scroll-Driven Animations:** El modelo rota 360° y viaja verticalmente según el progreso del scroll
- **Configurador Básico:** 4 presets de color (Midnight / Void / Ember / Arctic) cambian cuerpo, rejilla y LED ring en tiempo real mediante `useState`

### B. Interfaz de Usuario (React + CSS Modules)
- **Secciones Informativas:** Hero → Features → Specs → Buy → Footer
- **Beneficios/Características:** 4 cards con animaciones `useInView` sincronizadas al scroll
- **Precios y CTA:** Dos planes con botón "Añadir al carrito" con feedback visual animado (framer-motion AnimatePresence)
- **Responsividad:** Layout adaptado para mobile (canvas superpuesto, grid 2-col, configurador en bottom bar)

### C. Interactividad y Estados
- **Carga y Feedback:** `<Suspense>` con `<Loader3D>` custom (tres toroides animados con `useFrame`)
- **Eventos de Mouse:** Parallax suave — `mousemove` actualiza `mouseX/mouseY` → rotación X/Z del modelo en Three.js
- **Custom Cursor:** Cursor personalizado con anillo de seguimiento (lag suavizado con `requestAnimationFrame`)

## Estructura del Proyecto

```
src/
├── components/
│   ├── Scene.jsx          # Canvas R3F + luces
│   ├── TannySpeaker.jsx   # Modelo 3D procedural + animaciones
│   ├── Loader3D.jsx       # Suspense fallback 3D
│   ├── Navbar.jsx
│   ├── HeroSection.jsx
│   ├── FeaturesSection.jsx
│   ├── SpecsSection.jsx
│   ├── BuySection.jsx
│   └── Configurator.jsx   # Color picker
├── hooks/
│   ├── useScrollProgress.js
│   └── useCursor.js
└── App.jsx
```

## Instalación y Ejecución

```bash
npm install
npm run dev
```

## Build para Producción

```bash
npm run build
npm run preview
```

## Diseños

- **Tipografía:** Syne (headings) + DM Sans (body)
- **Paleta:** `#050508` bg · `#4ff8c4` accent · `#7b6ffa` secondary · `#ff6b6b` tertiary
- **Tema:** Dark mode, CSS custom properties, CSS Modules para scoping

---

