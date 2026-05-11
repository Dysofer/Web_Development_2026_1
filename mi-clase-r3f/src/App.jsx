import {Canvas} from '@react-three/fiber'
import Scene from './Scene'

function App() {

return(

  <Canvas shadows camera={{position: [0, 0, 5], fov: 45}}>
  <color attach="background" args={['#15151a']} />
  <Scene />
  </Canvas>
)
}

export default App