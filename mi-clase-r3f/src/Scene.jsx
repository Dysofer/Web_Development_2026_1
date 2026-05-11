import {OrbitControls, Stars, Center} from "@react-three/drei";
import {useRef} from "react";
import {useFrame} from "@react-three/fiber";

export default function Scene() {

const boxRef = useRef();

useFrame((state, delta) => {
    boxRef.current.rotation.y += delta;
})

return(

    <>
    <OrbitControls makeDefault/>
    <Stars/>
    <ambientLight intensity={0.5}/>
    <directionalLight position={[10, 10, 5]} intensity={1}/>

    <Center>
        <mesh ref={boxRef}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color="orange"/>
        </mesh>
    </Center>
    </>
)
}
