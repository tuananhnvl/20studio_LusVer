"use client"
import {Suspense,useState,useEffect} from 'react'
import {useFrame} from '@react-three/fiber'
import { Reflector,useTexture ,Text, PerspectiveCamera} from '@react-three/drei'

import * as THREE from 'three'
export default function FooterSpace({...props}) {
    return(
    <>
            <color attach="background" args={['black']} />
          <fog attach="fog" args={['black', 3.2, 4.6]} />
      <Suspense fallback={null}>
            <group  {...props} >
              {/* <Carla rotation={[0, Math.PI - 0.4, 0]} position={[-1.2, 0, 0.6]} scale={[0.26, 0.26, 0.26]} /> */}
              <VideoText position={[-.25, 0.36, -1]} rotation={[0,.2,0]}/>
              <Ground />
            </group>
            <ambientLight intensity={0.5} />
            <spotLight position={[0, 1, 0]} intensity={0.3} />
            <directionalLight position={[-50, 0, -40]} intensity={0.7} />
     
          </Suspense>
            <Intro/>
    </>
       
      )
}



function VideoText(props) {
    const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/drei.mp4', crossOrigin: 'Anonymous', loop: true, muted: true }))
    useEffect(() => void video.play(), [video])
    return (
      <Text font="/Inter-Bold.woff" fontSize={.72} letterSpacing={-0.06} {...props}>
        20
        <meshBasicMaterial toneMapped={false}>
          <videoTexture attach="map" args={[video]} />
        </meshBasicMaterial>
      </Text>
    )
  }
  function Ground() {
    const [floor, normal] = useTexture(['/SurfaceImperfections003_1K_var1.jpg', '/SurfaceImperfections003_1K_Normal.jpg'])
    return (
      <Reflector  blur={[200, 100]} resolution={512} args={[4, 3]} mirror={0.8} mixBlur={3} mixStrength={4.2} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        {(Material, props) => <Material color="#a0a0a0" metalness={0.2} roughnessMap={floor} normalMap={normal} normalScale={[2, 2]} {...props} />}
      </Reflector>
    )
  }
  


  function Intro() {
    const [vec] = useState(() => new THREE.Vector3())
    return useFrame((state) => {
      state.camera.position.lerp(vec.set(state.mouse.x / 2. , .52 + state.mouse.y / 6, 7), 0.05)
      state.camera.lookAt(0, 0, 0)

    })
  }
  