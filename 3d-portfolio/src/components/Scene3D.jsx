import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei'
import { InteractiveSphere } from './InteractiveSphere'
import { ProjectsScene } from './ProjectsScene'

export function Scene3D({ activeSection }) {
  return (
    <div className="w-full h-screen absolute top-0 left-0 z-0">
      <Canvas
        dpr={[1, 2]}
        performance={{ current: 1 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
          
          {/* Iluminación */}
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#00d9ff" />
          <pointLight position={[-10, -10, 5]} intensity={0.8} color="#ff006e" />
          
          {/* Fondo de estrellas */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          {/* Contenido según la sección */}
          {activeSection === 'hero' && <InteractiveSphere />}
          {activeSection === 'projects' && <ProjectsScene />}
          
          {/* Controles orbitales opcionales */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            autoRotate={activeSection === 'hero'}
            autoRotateSpeed={2}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
