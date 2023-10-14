"use client"
import {  useEffect,useRef,useMemo } from 'react'
import { useFrame,extend ,createPortal, useThree, PerspectiveCamera  } from '@react-three/fiber'

import {shaderMaterial,useFBO,useTexture } from '@react-three/drei'

import {Scene} from 'three'
import EffSimuControls from './EffSimuControls.js'

const WaveShaderMaterial = shaderMaterial(
    { uTime: 0, uTexture: null,uTextureNoiseDis:null},
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
   
        float a = (r.x - .05);

        if(r.r < 0.1 && r.b < 0.1) {
            r=vec3(1.,1.,1.);
        } 
      
        gl_FragColor = vec4(  r ,a * .1);
        
      }
    `
  )
  
  extend({ WaveShaderMaterial })
  
  
  export  const FBOScene = ({ props  })  => {
    const {viewport} = useThree()
    const target = useFBO(props)
    console.log( target)
    const cam = useRef()
   
    const scene = useMemo(() => {
      const scene = new Scene()
      return scene
    }, [])
  
const texture = useTexture('noise-dis1.png')
  
    useFrame((state) => {
     
      state.gl.setRenderTarget(target)
      state.gl.render(scene, cam.current)
      state.gl.setRenderTarget(null)
    })
  
    const shader = useRef()
    useEffect(() => {
        shader.current.transparent = true
        shader.current.uniforms.uTextureNoiseDis.value = texture
    },[shader,texture])
    useFrame(({ clock }) => (shader.current.uTime = clock.getElapsedTime()))
    return (
      <>
        <PerspectiveCamera ref={cam} position={[0, 0, 0]} />
        {createPortal(<EffSimuControls/>, scene)}
        <mesh>
          <planeBufferGeometry args={[viewport.width + 3, viewport.height+ 3]} />
          <waveShaderMaterial ref={shader} uTexture={target.texture} />
        </mesh>
      </>
    )
  }
  


