"use client"
import { useRef, useMemo } from 'react'
import { shaderMaterial, useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector2 } from 'three'
const imgDepthFrag = `
    uniform sampler2D textureOriginImage;
    uniform sampler2D textureOrigin;
    uniform sampler2D textureDepth;
    uniform vec2 mouse;
    uniform vec2 sizeView;
    varying vec2 vUv;
    void main() {
   
        vec2 uv = vUv / sizeView;
        uv += .5;
        vec4 depth = texture2D(textureDepth,uv);
        vec4 origin = texture2D(textureOriginImage,uv + mouse/30. * depth.r);
        gl_FragColor = origin;
    }
`
const baseVert = `
    varying vec2 vUv;    
    void main() {
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
        vUv = position.xy;
    }
`
export default function ImageDepthHover() {
    const [textureOriginImage, textureDepth] = useTexture(['origin.jpg', 'depth.jpg'])
    const ref = useRef(null)
    const statusMouse = useRef(0)
    const { viewport } = useThree()
    const uniforms = useMemo(
        () => ({
            iTime: {
                value: 0.0,
            },
            textureOriginImage: {
                value: textureOriginImage
            },
            textureDepth: {
                value: textureDepth
            },
            mouse: {
                value: new Vector2(0., 0.)
            },
            sizeView: {
                value: new Vector2(viewport.width, viewport.height)
            }
        }), []
    );
    useFrame((state) => {
        if (ref.current) {
            ref.current.material.uniforms.mouse.value = state.mouse
        }
    })
  
    return (
        <mesh ref={ref}
        onPointerOut={(e) => console.log('out')}
        onPointerMove={(e) => console.log('move')}
        >
            <planeGeometry args={[viewport.width, viewport.height]} />
            <shaderMaterial
                fragmentShader={imgDepthFrag}
                vertexShader={baseVert}
                uniforms={uniforms}
                wireframe={false}
            />
        </mesh>
    )
}
