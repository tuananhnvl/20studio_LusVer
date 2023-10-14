"use client"
import { useRef,useMemo, useEffect } from "react"
import {Vector2} from "three"
 import {useTexture} from '@react-three/drei'
import spaceFrag from '.././shader/spaceFrag'
import spaceVert from '.././shader/spaceVert'
import { useFrame } from "@react-three/fiber"
export default function SpaceShader({ ...props }) {  

    const texture = useTexture('noise-dis1.png')
    const ref=useRef()
    let time = 0.
    const uniforms = useMemo(
        () => ({
            iTime: {
                value: 0.0,
            },
            iResolution : {
                value: new Vector2(3,5)
            }
        }), []
    );
    useEffect(() => {
        ref.current.scale.set(.05,.05,.05)
    },[ref])
    useFrame(() => {
        time ++
        ref.current.material.uniforms.iTime.value = time / 100.
    })
    return (
      <group>
          <mesh ref={ref} { ...props }>
            <planeGeometry args={[300,300]}/>
            <shaderMaterial

                    fragmentShader={spaceFrag}
                    vertexShader={spaceVert}
                    uniforms={uniforms}
                    wireframe={false}
                
                />
             {/*    <meshBasicMaterial color={'red'}/> */}
        </mesh>
      </group>
    )
}