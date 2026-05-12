# 3D Portfolio - Dilan Solis Fernandez

Este proyecto es un portafolio web con fondo 3D interactivo construido con React, Tailwind CSS, Three Fiber y Framer Motion.

## Cómo usarlo

1. Instala dependencias:
   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abre la URL que indica la terminal (por ejemplo `http://localhost:3000`).

## Interacción en la sección Hero

- La pantalla inicial muestra un mundo 3D interactivo.
- Mueve el mouse para rotar suavemente la escena.
- Coloca el cursor sobre las burbujas flotantes para leer los mensajes.
- Haz clic sobre una burbuja para activar su mensaje.
- Puedes usar el botón derecho del mouse para mover la cámara con los controles de órbita.

## Estructura

- `src/App.jsx` — página principal y navegación entre secciones.
- `src/components/Scene3D.jsx` — canvas de Three Fiber con controles y estrellas.
- `src/components/InteractiveSphere.jsx` — esfera principal y burbujas de mensaje interactivas.
- `src/components/HeroSection.jsx` — contenido principal del hero.
- `src/components/AboutSection.jsx`, `ProjectsSection.jsx`, `ContactSection.jsx` — secciones secundarias.
