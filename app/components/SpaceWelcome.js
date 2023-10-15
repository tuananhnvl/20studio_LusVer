"use client"
import SpaceShader from "./SpaceShader"
import { useRef,useEffect ,useMemo} from "react"
import { useThree,useFrame ,createPortal,extend} from "@react-three/fiber"
import { useFBO,useTexture,PerspectiveCamera ,shaderMaterial} from "@react-three/drei"
import { Scene,RGBAFormat } from "three"
import BoxGeomestry from './BoxGeomestry'
import { createNoise2D } from 'simplex-noise';
const WaveShaderMaterial = shaderMaterial(
  { uTime: 0, uTexture: null,uTextureNoiseDis:null},
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position =  vec4(position, 1.0);
    }
  `,
  `
    precision mediump float;
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform sampler2D uTextureNoiseDis;
    uniform vec3 uColor;

    varying vec2 vUv;

    void main() {
      vec4 t = texture2D(uTexture, vUv);   
      gl_FragColor = t;
      
    }
  `
)
extend({WaveShaderMaterial})
const FBOScene = ({ props }) => {
    const {viewport} = useThree()
    const target = useFBO(props)
    const cam = useRef()
    const refMeshChild = useRef()
    const textureLightMap = useTexture('lightmap.png')
    const scene = useMemo(() => {
      const scene = new Scene()
      return scene
    }, [])
 
    const noise2D = createNoise2D();
    useFrame((state) => {
        console.log()
      if(localStorage.getItem('posCurrent') > 3000) {
        /* refMeshChild.current.position.x += (noise2D(refMeshChild.current.position.x, refMeshChild.current.position.y)/2.);
        refMeshChild.current.position.y += (noise2D(refMeshChild.current.position.x, refMeshChild.current.position.z)/2.);
       */
        refMeshChild.current.position.x += (noise2D(refMeshChild.current.rotation.y , refMeshChild.current.rotation.z)/30.)
        //refMeshChild.current.position.z += (noise2D(refMeshChild.current.position.x , refMeshChild.current.position.y)/100.)
        refMeshChild.current.position.y += (noise2D(refMeshChild.current.position.x , refMeshChild.current.rotation.z)/60.)
        refMeshChild.current.rotation.y += 0.01;
        refMeshChild.current.rotation.z += 0.01;
      }
      state.gl.setRenderTarget(target)
      state.gl.render(scene, cam.current)
     
      state.gl.setRenderTarget(null)

   
    })
  
    const onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <premultiplied_alpha_fragment>',
        `
        #include <premultiplied_alpha_fragment>
        vec3 rel = outgoingLight;
        rel.x += sin(rel.x);
   
        gl_FragColor = vec4(rel,1.);
      `
      ),
      console.log(shader.fragmentShader)
    }
  

    return (    
      <>
        <PerspectiveCamera ref={cam} position={[0, 0, 2]} />
        {createPortal(  <SpaceShader/>  ,scene)}
        <group>
           <group >
            <mesh>
                  <planeGeometry args={[16,6]} />
                {/*  <waveShaderMaterial ref={shader} uTexture={target.texture} /> */}
                  <meshBasicMaterial map={target.texture}/>
                
              </mesh>
           </group>
            {/* <SpaceShader/> */}
            <group ref={refMeshChild} position={[0,0,0]}>
              <mesh >
                <boxGeometry arg={[.05,.05,.05]}/>
                <meshBasicMaterial onBeforeCompile={onBeforeCompile} map={target.texture}/*  lightMap={textureLightMap} */ />
              </mesh>
            </group>
        </group>
      </>
    )
  }

export default function SpaceAll() {
  return (
    <FBOScene multisample samples={5} stencilBuffer={false} format={RGBAFormat} />
  )
}

