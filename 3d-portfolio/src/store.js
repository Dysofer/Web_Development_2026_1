import { create } from 'zustand'

export const useStore = create((set) => ({
  // Estado de la cámara
  activeProject: null,
  setActiveProject: (project) => set({ activeProject: project }),
  
  // Estado del formulario de contacto
  isFormSubmitted: false,
  setIsFormSubmitted: (submitted) => set({ isFormSubmitted: submitted }),
  
  // Estado del seguimiento del mouse
  mousePosition: { x: 0, y: 0 },
  setMousePosition: (x, y) => set({ mousePosition: { x, y } }),
  
  // Estado de la sección activa
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
  
  // Estado del hover en objetos
  hoveredObject: null,
  setHoveredObject: (object) => set({ hoveredObject: object }),
}))
