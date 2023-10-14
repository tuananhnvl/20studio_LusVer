"use client"
import {useFrame} from '@react-three/fiber'
import { useRef } from 'react'
import { AdditiveBlending} from 'three'
export default function BoxGeomestry({...props}) {
    const ref = useRef(null)
    useFrame(() => {
        ref.current.rotation.x += 0.01;
        ref.current.rotation.y += 0.01;
    })
  return (
    <group ref={ref} {...props}>
        <mesh>
            <boxGeometry args={[1,1,1]}/>
            <meshBasicMaterial    blending={AdditiveBlending} color={'blue'}/>
        </mesh>
    </group>
  )
}
