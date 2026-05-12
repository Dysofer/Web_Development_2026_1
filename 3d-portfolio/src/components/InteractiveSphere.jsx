import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../store'

const messageBubbles = [
  { text: 'Bienvenido al mundo 3D', position: [2.2, 0.8, -1.2], color: '#00d9ff' },
  { text: 'Explora con el mouse', position: [-2.1, 1.1, -0.8], color: '#ff006e' },
  { text: 'Haz hover para interactuar', position: [0.8, -1.4, -1.5], color: '#3b82f6' },
]

export function InteractiveSphere() {
  const meshRef = useRef()
  const groupRef = useRef()
  const bubbleRefs = useRef([])
  const { mousePosition, hoveredObject, setHoveredObject, setMousePosition } = useStore((state) => ({
    mousePosition: state.mousePosition,
    hoveredObject: state.hoveredObject,
    setHoveredObject: state.setHoveredObject,
    setMousePosition: state.setMousePosition,
  }))
  const [activeMessage, setActiveMessage] = useState(null)
  const bubbles = useMemo(() => messageBubbles, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition(x, y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [setMousePosition])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0015
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mousePosition.y * 0.2,
        0.03,
      )
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        mousePosition.x * 0.2,
        0.03,
      )
    }

    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001
      meshRef.current.rotation.y += 0.002
      meshRef.current.rotation.y += mousePosition.x * 0.01
      meshRef.current.rotation.x += mousePosition.y * 0.01

      const targetScale = hoveredObject === 'hero-sphere' ? 1.2 : 1
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.08)
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.08)
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale, 0.08)
    }

    bubbleRefs.current.forEach((ref, index) => {
      if (!ref) return
      const speed = 0.5 + index * 0.1
      ref.rotation.y += 0.005 * speed
      const hoverScale = hoveredObject === `message-${index}` ? 1.15 : 1
      ref.scale.x = THREE.MathUtils.lerp(ref.scale.x, hoverScale, 0.08)
      ref.scale.y = THREE.MathUtils.lerp(ref.scale.y, hoverScale, 0.08)
      ref.scale.z = THREE.MathUtils.lerp(ref.scale.z, hoverScale, 0.08)
    })
  })

  return (
    <group ref={groupRef}>
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

      {bubbles.map((bubble, index) => (
        <group
          key={bubble.text}
          ref={(el) => (bubbleRefs.current[index] = el)}
          position={bubble.position}
        >
          <mesh
            onPointerOver={() => {
              setHoveredObject(`message-${index}`)
              setActiveMessage(index)
            }}
            onPointerOut={() => {
              setHoveredObject(null)
              setActiveMessage(null)
            }}
            onClick={() => setActiveMessage(index)}
          >
            <sphereGeometry args={[0.28, 32, 32]} />
            <meshStandardMaterial
              color={bubble.color}
              emissive={bubble.color}
              emissiveIntensity={0.7}
              transparent
              opacity={0.85}
            />
          </mesh>
          {activeMessage === index && (
            <Html center distanceFactor={6} position={[0, 0.45, 0]}>
              <div
                style={{
                  padding: '0.45rem 0.8rem',
                  borderRadius: '999px',
                  background: 'rgba(7, 30, 71, 0.9)',
                  color: '#a5f3fc',
                  fontSize: '0.85rem',
                  border: '1px solid rgba(0, 217, 255, 0.35)',
                  whiteSpace: 'nowrap',
                }}
              >
                {bubble.text}
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  )
}
