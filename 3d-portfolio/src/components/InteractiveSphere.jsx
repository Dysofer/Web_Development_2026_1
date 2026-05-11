import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useStore } from '../store'

export function InteractiveSphere() {
  const meshRef = useRef()
  const { camera } = useThree()
  const { mousePosition, hoveredObject, setHoveredObject } = useStore()
  
  // Seguimiento del mouse para rotación
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      useStore.setState({ mousePosition: { x, y } })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  // Animación de rotación
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001
      meshRef.current.rotation.y += 0.002
      
      // Rotación adicional basada en la posición del mouse
      meshRef.current.rotation.x += mousePosition.y * 0.02
      meshRef.current.rotation.y += mousePosition.x * 0.02
      
      // Escala en hover
      if (hoveredObject === 'hero-sphere') {
        meshRef.current.scale.lerp({ x: 1.2, y: 1.2, z: 1.2 }, 0.1)
      } else {
        meshRef.current.scale.lerp({ x: 1, y: 1, z: 1 }, 0.1)
      }
    }
  })
  
  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      onPointerOver={() => setHoveredObject('hero-sphere')}
      onPointerOut={() => setHoveredObject(null)}
    >
      <icosahedronGeometry args={[1, 4]} />
      <meshPhongMaterial
        color={hoveredObject === 'hero-sphere' ? '#ff006e' : '#00d9ff'}
        wireframe={true}
        emissive={hoveredObject === 'hero-sphere' ? '#ff006e' : '#00d9ff'}
        emissiveIntensity={hoveredObject === 'hero-sphere' ? 0.8 : 0.3}
      />
    </mesh>
  )
}
