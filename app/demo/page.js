"use client" 
import { useEffect,useRef } from 'react'
import {DeviceOrientationControls} from '../components/DeviceOrientationControls'
import {Canvas,useFrame,useThree} from '@react-three/fiber'
/* https://ugpfn.csb.app/ */
function Controls() {
    const {camera} = useThree()
    const controls = useRef()
    useEffect(() => {
        controls.current  = new DeviceOrientationControls(camera)
        controls.current.connect()
    
    })
    useFrame(() => {
      
  
        controls.current.update()
    })
    return null
}
export default function page() {
 

  return (
    <div style={{width:'100vw',height:'100vh',position:'fixed'}}>
        <Canvas>
            <group>
                <mesh>
                    <boxGeometry args={[3,3,3]}/>
                    <meshBasicMaterial color={'blue'}/>
                </mesh>
            </group>
            <Controls/>
        </Canvas>
    </div>
  )
}
