"use client"
import { useEffect, useRef, useMemo } from 'react'
import { useFrame, extend, createPortal, useThree } from '@react-three/fiber'
import { shaderMaterial, useFBO, PerspectiveCamera } from '@react-three/drei'
import { Scene } from 'three'
import EffSimuControls from './EffSimuControls.js'

const ShaderOutput = shaderMaterial(
  { uTime: 0, uTexture: null, uTextureNoiseDis: null },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    precision mediump float;
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform sampler2D uTextureNoiseDis;
    uniform vec3 uColor;

    varying vec2 vUv;

    float rand(float n){return fract(sin(n) * 43758.5453123);}

    float noise(float p){
        float fl = floor(p);
    float fc = fract(p);
        return mix(rand(fl), rand(fl + 1.0), fc);
    }


    void main() {
      vec3 t = texture2D(uTexture, vUv).rgb;   
      vec3 r  =  t;
 
      float a = (r.x - .1);

      if(r.r < 0.1 && r.b < 0.1) {
          r=vec3(0.,0.,0.);
      } 
    
      gl_FragColor = vec4(  r,a * .05);

      
    }
  `
)

extend({ ShaderOutput })

export const FBOSceneSim = ({ props }) => {
  const { viewport } = useThree()
  const target = useFBO(props)

  console.log('this fbo props', target)
  const cam = useRef()
  const shader = useRef()


  const scene = useMemo(() => {
    const scene = new Scene()
    return scene
  }, [])

  useEffect(() => {
    shader.current.transparent = true
  }, [shader])


  useFrame((state) => {

    state.gl.setRenderTarget(target)
    state.gl.render(scene, cam.current)
    state.gl.setRenderTarget(null)

    
  })



  return (
    <>
      <PerspectiveCamera ref={cam} position={[0, 0, 0]} />
      {createPortal(<EffSimuControls />, scene)}
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <shaderOutput ref={shader} uTexture={target.texture} />
        {/*  <meshBasicMaterial color={'blue'}  wireframe={true}/> */}
      </mesh>
    </>
  )
}
