import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export default function Loader3D() {
  const groupRef = useRef()
  const ring1 = useRef()
  const ring2 = useRef()
  const ring3 = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (ring1.current) ring1.current.rotation.z = t * 1.5
    if (ring2.current) ring2.current.rotation.z = -t * 1.1
    if (ring3.current) ring3.current.rotation.x = t * 0.9
  })

  return (
    <group ref={groupRef}>
      <mesh ref={ring1}>
        <torusGeometry args={[0.8, 0.03, 8, 60]} />
        <meshStandardMaterial color="#4ff8c4" emissive="#4ff8c4" emissiveIntensity={1} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[0.55, 0.025, 8, 60]} />
        <meshStandardMaterial color="#7b6ffa" emissive="#7b6ffa" emissiveIntensity={1} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[0.3, 0.02, 8, 60]} />
        <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={1} />
      </mesh>
      <ambientLight intensity={0.5} />
    </group>
  )
}
