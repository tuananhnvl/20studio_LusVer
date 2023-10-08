"use client"
import { useRef,useMemo, useEffect } from "react"
import * as THREE from "three"
import spaceFrag from '.././shader/spaceFrag'
import spaceVert from '.././shader/spaceVert'
export default function SpaceShader({ ...props }) {
    const ref=useRef()
    const uniforms = useMemo(
        () => ({
            u_time: {
                value: 0.0,
            },
            iResolution : {
                value: new THREE.Vector2(window.innerWidth/2,window.innerHeight/2)
            }
        }), []
    );
    useEffect(() => {
        ref.current.scale.set(10,10 ,1)
    },[ref])
    return (
        <mesh ref={ref} { ...props }>
            <planeGeometry args={[1,1]}/>
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