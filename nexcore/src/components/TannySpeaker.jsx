import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, ContactShadows, Environment, Html } from '@react-three/drei'
import * as THREE from 'three'

// Color presets for the configurator
export const COLOR_PRESETS = {
  midnight: { body: '#1a1a2e', ring: '#4ff8c4', grill: '#0d0d1a', name: 'Midnight' },
  void:     { body: '#0d0d0d', ring: '#7b6ffa', grill: '#050505', name: 'Void' },
  ember:    { body: '#2d1111', ring: '#ff6b6b', grill: '#1a0a0a', name: 'Ember' },
  arctic:   { body: '#e8e8f0', ring: '#4ff8c4', grill: '#c8c8d8', name: 'Arctic' },
}

function SpeakerGrill({ color }) {
  const dots = useMemo(() => {
    const arr = []
    const rows = 8, cols = 14
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2 + 0.5) * 0.065
        const y = (r - rows / 2 + 0.5) * 0.07
        const dist = Math.sqrt(x * x + y * y)
        if (dist < 0.42) arr.push([x, y])
      }
    }
    return arr
  }, [])

  return (
    <group>
      {dots.map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.001]}>
          <circleGeometry args={[0.018, 8]} />
          <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}

function LedRing({ color, pulse }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.emissiveIntensity = 0.6 + Math.sin(clock.elapsedTime * 2) * 0.4
    }
  })
  return (
    <mesh ref={ref} position={[0, -0.82, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.42, 0.025, 16, 80]} />
      <meshStandardMaterial
        ref={ref}
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  )
}

export default function TannySpeaker({ scrollProgress, mouseX, mouseY, colorPreset = 'midnight' }) {
  const groupRef = useRef()
  const bodyRef = useRef()
  const colors = COLOR_PRESETS[colorPreset]

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime

    // Scroll-driven rotation: 0 → full 360° as user scrolls
    const targetRotY = scrollProgress * Math.PI * 2

    // Mouse parallax
    const parallaxX = mouseX * 0.3
    const parallaxY = mouseY * 0.2

    // Scroll-driven scale: grows slightly at mid-scroll
    const scaleBase = 1 + Math.sin(scrollProgress * Math.PI) * 0.15
    groupRef.current.scale.setScalar(scaleBase)

    // Scroll-driven vertical travel
    groupRef.current.position.y = scrollProgress * -1.2 + 0.6

    // Smooth rotation
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.04
    groupRef.current.rotation.x += (parallaxY * 0.15 - groupRef.current.rotation.x) * 0.06
    groupRef.current.rotation.z += (parallaxX * -0.08 - groupRef.current.rotation.z) * 0.06

    // Idle breathing
    const breathe = Math.sin(t * 0.8) * 0.008
    if (bodyRef.current) {
      bodyRef.current.position.y = breathe
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.1}>
        <group ref={bodyRef}>

          {/* Main cylindrical body */}
          <mesh castShadow>
            <cylinderGeometry args={[0.48, 0.44, 1.65, 64, 1, false]} />
            <meshStandardMaterial
              color={colors.body}
              roughness={0.25}
              metalness={0.6}
            />
          </mesh>

          {/* Fabric grill wrap — front face */}
          <mesh position={[0, 0, 0.47]}>
            <cylinderGeometry args={[0.38, 0.38, 1.3, 32, 1, false]} />
            <meshStandardMaterial color={colors.grill} roughness={0.9} metalness={0.05} />
          </mesh>

          {/* Grill dots pattern */}
          <group position={[0, 0, 0.481]} rotation={[Math.PI / 2, 0, 0]}>
            <SpeakerGrill color={colors.grill} />
          </group>

          {/* Top cap */}
          <mesh position={[0, 0.85, 0]} castShadow>
            <cylinderGeometry args={[0.46, 0.48, 0.06, 64]} />
            <meshStandardMaterial color={colors.body} roughness={0.15} metalness={0.8} />
          </mesh>

          {/* NexCore logo disc on top */}
          <mesh position={[0, 0.89, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.015, 32]} />
            <meshStandardMaterial color={colors.ring} roughness={0.05} metalness={0.95} emissive={colors.ring} emissiveIntensity={0.3} />
          </mesh>

          {/* Bottom base */}
          <mesh position={[0, -0.85, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.46, 0.5, 0.08, 64]} />
            <meshStandardMaterial color={colors.body} roughness={0.3} metalness={0.7} />
          </mesh>

          {/* LED ring at base */}
          <LedRing color={colors.ring} />

          {/* Accent ring in the middle */}
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.485, 0.012, 8, 80]} />
            <meshStandardMaterial color={colors.ring} roughness={0.1} metalness={0.9} emissive={colors.ring} emissiveIntensity={0.15} />
          </mesh>

          {/* Volume touch strip */}
          <mesh position={[0, 0.55, 0.45]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.22, 0.018, 0.02]} />
            <meshStandardMaterial color={colors.ring} roughness={0.05} metalness={0.9} emissive={colors.ring} emissiveIntensity={0.5} />
          </mesh>

          {/* Mute button */}
          <mesh position={[0, 0.68, 0.45]}>
            <cylinderGeometry args={[0.025, 0.025, 0.018, 16]} />
            <meshStandardMaterial color="#ff4444" roughness={0.2} metalness={0.5} emissive="#ff2222" emissiveIntensity={0.4} />
          </mesh>

        </group>
      </Float>

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.6}
        scale={3}
        blur={2.5}
        far={3}
        color="#4ff8c4"
      />
    </group>
  )
}
