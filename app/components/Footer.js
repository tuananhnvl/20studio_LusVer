"use client"
import * as THREE from 'three'
import { useEffect, useState ,useRef} from 'react'
import {useFrame } from '@react-three/fiber'
import { Reflector , Text, useTexture } from '@react-three/drei'



{/* <Canvas concurrent gl={{ alpha: false }} pixelRatio={[1, 1.5]} camera={{ position: [0, 3, 100], fov: 15 }}>
      <color attach="background" args={['black']} />
      <fog attach="fog" args={['black', 15, 20]} />
      <Suspense fallback={null}>
        <group position={[0, -1, 0]}>
          <VideoText position={[0, 1.3, -2]} />
          <Ground />
        </group>
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.3} />
        <directionalLight position={[-50, 0, -40]} intensity={0.7} />
        <Intro />
      </Suspense>
    </Canvas> */}

function VideoText(props) {
 
  const [video] = useState(() => Object.assign(document.createElement('video'), { src: 'vid720.mp4', crossOrigin: 'Anonymous', loop: true, muted: true }))
  useEffect(() => void video.play(), [video])
 
  return (
    <group name='ModelOnFooter-Model'> 
    <Text  font="/Inter-ExtraBold.ttf" fontSize={2} letterSpacing={-0.06} {...props}>
      20 STUDIO
      <meshBasicMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]}/*  encoding={THREE.TextureEncoding}  *//>
      </meshBasicMaterial>
    </Text>
    </group>
   
  )
}

function Ground() {
  const [floor, normal] = useTexture(['Jzpo-SurfaceImperfections003_1K_var1.jpg', 'Soy5-SurfaceImperfections003_1K_Normal.jpg'])
  return (
    <group name='ModelOnFooter-Ground'>
      <Reflector blur={[400, 100]} resolution={512} args={[10, 27]} mirror={0.5} mixBlur={6} mixStrength={1.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        {(Material, props) => <Material color="#F6F4EB" metalness={0.4} roughnessMap={floor}/*  normalMap={normal} normalScale={[2, 2]} */ {...props} />}
      </Reflector>
    </group> 
    
  )
}

const Footer = ({...props}) => {
  const group= useRef(null)
  const [vec] = useState(() => new THREE.Vector3())
  useFrame((state)=>{
    let posCurrent = localStorage.getItem('posCurrent')/100.
    if(posCurrent > 20) {
    
      let targetRoll = vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14)
   //   console.log(group.current,targetRoll)
      group.current.rotation.x = targetRoll.y / 40.
      group.current.rotation.y = targetRoll.x / 40.
      //  state.camera.lookAt(0, -40, 0)
    }
    
  })
  return (
    <group ref={group} {...props} name='ModelOnFooter'>
      <VideoText position={[0, 1.3, -2]} />
      <Ground />
    </group>
  )
}
export default Footer