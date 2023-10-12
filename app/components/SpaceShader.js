"use client"
import { useRef,useMemo, useEffect } from "react"
import * as THREE from "three"
import spaceFrag from '.././shader/spaceFrag'
import spaceVert from '.././shader/spaceVert'
import { useFrame } from "@react-three/fiber"
export default function SpaceShader({ ...props }) {
    const ref=useRef()
    let time = 0.
    const uniforms = useMemo(
        () => ({
            iTime: {
                value: 0.0,
            },
            iResolution : {
                value: new THREE.Vector2(3,5)
            }
        }), []
    );
    useEffect(() => {
        ref.current.scale.set(.3,.2 ,1)
    },[ref])
    useFrame(() => {
        time ++
        ref.current.material.uniforms.iTime.value = time / 100.
    })
    return (
        <mesh ref={ref} { ...props }>
            <planeGeometry args={[50,30]}/>
            <shaderMaterial
        
                    fragmentShader={spaceFrag}
                    vertexShader={spaceVert}
                    uniforms={uniforms}
                    wireframe={false}
                    side={2}
                />
        </mesh>
    )
}