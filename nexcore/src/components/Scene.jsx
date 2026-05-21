import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Preload, AdaptiveDpr } from '@react-three/drei'
import TannySpeaker from './TannySpeaker'
import Loader3D from './Loader3D'

export default function Scene({ scrollProgress, mouseX, mouseY, colorPreset }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <AdaptiveDpr pixelated />

      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        color="#ffffff"
      />
      <pointLight position={[-4, 2, -2]} intensity={0.8} color="#7b6ffa" />
      <pointLight position={[3, -2, 3]} intensity={0.6} color="#4ff8c4" />
      <spotLight
        position={[0, 6, 0]}
        intensity={0.5}
        angle={0.4}
        penumbra={0.8}
        color="#ffffff"
      />

      <Suspense fallback={<Loader3D />}>
        <TannySpeaker
          scrollProgress={scrollProgress}
          mouseX={mouseX}
          mouseY={mouseY}
          colorPreset={colorPreset}
        />
        <Environment preset="city" />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
