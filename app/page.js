"use client"
import * as THREE from 'three'
import { Suspense, useEffect, useReducer,useRef,useMemo } from 'react'
import Lenis from '@studio-freight/lenis'


import { Canvas, useFrame,extend ,createPortal, useThree } from '@react-three/fiber'
import { Stats,useProgress,Html,shaderMaterial,useFBO,useTexture } from '@react-three/drei'

import {Bloom, EffectComposer, DepthOfField, Noise, Vignette } from "@react-three/postprocessing"
import {
  View,
  Preload,
  OrbitControls,
  PerspectiveCamera,
  Lightformer,
  Environment
} from '@react-three/drei'
import useRefs from 'react-use-refs'
import { Perf } from 'r3f-perf'
import SpaceShader from './components/SpaceShader'
import Navbar from './components/Navbar'
import { BallLusion } from './components/BallLusion'  
import  {FBOSceneSim} from './fuild2/FBOSceneSim'
import EffSimuControls from './fuild2/EffSimuControls'
import BoxGeomestry from './components/BoxGeomestry'
import SpaceWelcome from './components/SpaceWelcome'
import SceneFBOParicels from './components/SceneFBOParicels'



const ShaderDisplay = shaderMaterial(
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
   
        float a = (r.x - .1);

        if(r.r < 0.1 && r.b < 0.1) {
            r=vec3(0.,0.,0.);
        } 
      
        gl_FragColor = vec4(  r ,a * .1);
   
        
      }
    `
  )
  const ShaderMonitor = shaderMaterial(
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

      void main() {
        vec3 t = texture2D(uTexture, vUv).rgb;   
        gl_FragColor = vec4(t,1.);
        
      }
    `
  )


  const ShaderImg = shaderMaterial(
    { uTime: 0, uTextureImage: null,uTextureTarget:null},
    `
      varying vec2 vUv;
      void main() {
       
      
        vec3 pos = position;

        vUv = uv / 1.5;
        gl_Position = vec4(pos, 1.0);
      }
    `,
    `
      precision mediump float;
      uniform float uTime;
      uniform sampler2D uTextureImage;
      uniform sampler2D uTextureTarget;
      uniform vec3 uColor;
  
      varying vec2 vUv;

      void main() {


          
        vec2 scaleCenter = vec2(0.75);
        vec2 uvs = (vUv - scaleCenter) * 2. + scaleCenter;
        

        

        vec3 t = texture2D(uTextureImage, uvs).rgb;   
        vec3 n = texture2D(uTextureTarget, vUv).xyz;   
  
        gl_FragColor = vec4((t),1.);
        
      }
    `
  )


  extend({ ShaderDisplay })
  extend({ ShaderMonitor })
  extend({ ShaderImg})
  const FBOScene = ({ props }) => {
    const {viewport} = useThree()
    const target = useFBO(props)
    const target1 = useFBO(props)
    const cam = useRef()
    const shader = useRef()
    const shader1 = useRef()
    const scene = useMemo(() => {
      const scene = new THREE.Scene()
      return scene
    }, [])
    const scene1 = useMemo(() => {
        const scene1 = new THREE.Scene()
        return scene1
      }, [])
    const texture = useTexture('CUSTOMER.jpg')
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    useFrame((state) => {
     
     
      state.gl.setRenderTarget(target)
      state.gl.render(scene, cam.current)
      state.gl.setRenderTarget(null)

   
    })
  
  
    useEffect(() => { 
        if(shader.current) { 
            shader.current.transparent = true
        }
        
        
       
    },[shader,texture])
    useFrame(({ clock }) => {  
         
        if(shader.current) {         shader.current.uTime = clock.getElapsedTime()
            shader1.current.uTime = clock.getElapsedTime() }

    })
    return (    
      <>
        <PerspectiveCamera ref={cam} position={[0, 0, 0]} />
   
        {createPortal(  <EffSimuControls/>  ,scene)}
        <group>
            <mesh>
                <planeGeometry args={[viewport.width,viewport.height,2,2]} />
                <shaderDisplay ref={shader} uTexture={target.texture} />
               {/*  <meshBasicMaterial color={'blue'}  wireframe={true}/> */}
            </mesh>
            <mesh position={[(viewport.width/2 ) - (viewport.width /5/2) ,(viewport.height/2 ) - (viewport.height /5),0]}>
                <planeGeometry args={[viewport.width /5, viewport.height/5]}/>
                <shaderMonitor ref={shader1} uTexture={target.texture} />
            </mesh>
           {/*  <mesh>

               <planeGeometry args={[.5,1,32,32]}/>
                <shaderImg uTextureImage={texture} uTextureTarget={target.texture} wireframe={false}/>
            </mesh> */}
        </group>
      </>
    )
  }
  








export default function Home() {
    console.log('Home load')
  
  const [ref, boxPhysic, lenis, spaceShader, fixedView, view5, view6] = useRefs(null)
  const listColorBall = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00']
  const [colorNew, changePropsForCanvas] = useReducer((state) => ++state % listColorBall.length, 0)
 
  useEffect(() => {
    console.log('frist load -- lenis')
    lenis.current = new Lenis({
        syncTouch:false
    })
    lenis.current.on('scroll', (e) => {
 localStorage.setItem('posCurrent', 0)
      localStorage.setItem('posCurrent', e.scroll)
    })

    function raf(time) {
      lenis.current.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

  }, [])



  const handleButtonClick = () => {
    lenis.current.scrollTo('.main')
  };
  return (

    <>
      <main ref={ref} className="main">
            <Navbar/>
            <div style={{width:'100vw',height:'100vh',position:'fixed'}} ref={fixedView}>
            
            </div>
            <div id="page-container" >
                <div id="page-container-inner">
                    <div id="home" className="page">
                        <div id="home-hero" className="section">
                            <div id="home-hero-title">
                            Chúng tôi cung cấp dịch vụ thiết kế và sản xuất thời trang cao cấp.
                            </div>
                            <div id="home-hero-visual-container" ref={boxPhysic} onClick={changePropsForCanvas}></div>
                            <div id="home-hero-scroll-container">
                                <div id="home-hero-scroll-container-crosses">
                                    <div className="home-hero-scroll-container-cross" ></div>
                                    <div className="home-hero-scroll-container-cross" ></div>
                                    <div className="home-hero-scroll-container-cross" ></div>
                                    <div className="home-hero-scroll-container-cross" ></div>
                                </div>
                                <div id="home-hero-scroll">
                                    Scroll to explore
                                </div>
                            </div>
                        </div>
                        <div id="home-reel" className="section">
                            <h4 id="home-reel-title">
                                <div id="home-reel-title-inner" style={{ transform: 'translate3d(0px, -21.91px, 0px)' }}>
                                Phát triển và Sáng tạo ra nhựng sản phẩm độc nhất.
                                </div>
                            </h4>
                            <div id="home-reel-content">
                                <div id="home-reel-desc" style={{ transform: 'translate3d(0px, -48px, 0px)' }}>
                                20STUDIO LÀ CÔNG TY CHUYÊN VỀ THIẾT KẾ, TẠO RA NHỮNG SẢN PHẨM MANG TÍNH SÁNG TẠO, ĐỘC NHẤT, “ĐẶC BIỆT”. CHÚNG TÔI GIÚP KHÁCH HÀNG TRUYỀN TẢI ĐƯỢC PHONG CÁCH VÀ CÂU CHUYỆN QUA SẢN PHẨM CỦA HỌ. VỚI ĐỘI NGŨ TRẺ VÀ TÀI NĂNG, CHÚNG TÔI GIÚP KHÁCH HÀNG LOẠI BỎ NHỮNG GIỚI HẠN BẰNG KHẢ NĂNG THIẾT KẾ, GIẢI QUYẾT VẤN ĐỀ NHẰM TẠO RA MỘT SẢN PHẨM THỜI TRANG ĐỈNH NHẤT
                                </div>
                                <a id="home-reel-cta" href="/aboutus" style={{ transform: 'translateY(-20.9px) translate3d(0px, 0%, 0px) rotate(0deg)', opacity: 1 }}>
                                    <span id="home-reel-cta-dot"></span><span id="home-reel-cta-text">About us</span>
                                    <span id="home-reel-cta-arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                            <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984"></path>
                                        </svg>
                                    </span>
                                </a>
                            </div>
                            <div id="home-reel-thumb-wrapper">
                                <div id="home-reel-thumb" >
                                </div>
                            </div>
                            <div id="home-reel-container">
                                <div id="home-reel-container-inner">
                                    <div id="home-reel-video-container" style={{ height: '532.2px', marginTop: '48.2px', transform: 'translate3d(0px, 0px, 0px)' }} className="--is-visible">
                                        <div id="home-reel-video-container-decoration">
                                            <div id="home-reel-video-container-top">
                                                <div id="home-reel-video-container-crosses">
                                                    <div className="home-reel-video-container-cross" style={{ transform: 'translate3d(0px, 0em, 0px) scale(1) rotate(0deg)' }}></div>
                                                    <div className="home-reel-video-container-cross" style={{ transform: 'translate3d(0px, 0em, 0px) scale(1) rotate(0deg)' }}></div>
                                                    <div className="home-reel-video-container-cross" style={{ transform: 'translate3d(0px, 0em, 0px) scale(1) rotate(0deg)' }}></div>
                                                    <div className="home-reel-video-container-cross" style={{ transform: 'translate3d(0px, 0em, 0px) scale(1) rotate(0deg)' }}></div>
                                                    <div className="home-reel-video-container-cross" style={{ transform: 'translate3d(0px, 0em, 0px) scale(1) rotate(0deg)' }}></div>
                                                </div>
                                                <div className="home-reel-video-container-svgs">
                                                    <div className="home-reel-video-container-svg-wrapper" style={{ transform: ' translate3d(0px, 0px, 0px)' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="home-reel-video-container-bottom">
                                                <div id="home-reel-video-container-crosses">
                                                    <div className="home-reel-video-container-cross" style={{ transform: 'translate3d(0px, 0em, 0px) scale(1) rotate(0deg)' }}></div>
                                                    <div className="home-reel-video-container-cross" style={{ transform: 'translate3d(0px, 0em, 0px) scale(1) rotate(0deg)' }}></div>
                                                    <div className="home-reel-video-container-cross" style={{ transform: 'translate3d(0px, 0em, 0px) scale(1) rotate(0deg)' }}></div>
                                                    <div className="home-reel-video-container-cross" style={{ transform: 'translate3d(0px, 0em, 0px) scale(1) rotate(0deg)' }}></div>
                                                    <div className="home-reel-video-container-cross" style={{ transform: 'translate3d(0px, 0em, 0px) scale(1) rotate(0deg)' }}></div>
                                                </div>
                                                <div className="home-reel-video-container-svgs">
                                                    <div className="home-reel-video-container-svg-wrapper" style={{ transform: 'translate3d(-1296px, 0px, 0px)' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="home-reel-video-placeholder">
                                            <div id="home-reel-video-title">
                                                <div className="home-reel-video-title-word">
                                                  PLAY
                                                </div>
                                                <div className="home-reel-video-title-word">
                                                  REEL
                                                </div>
                                            </div>
                                        </div>
                                        <button id="home-reel-video-watch-btn" aria-label="Watch reel button" >
                                            <div id="home-reel-video-watch-btn-base"></div>
                                            <div id="home-reel-video-watch-btn-background"></div>
                                            <svg id="home-reel-video-watch-btn-svg" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 36 36">
                                                <path fill="currentColor" d="M7 7.29c0-1.5 1.59-2.466 2.92-1.776l20.656 10.71c1.439.747 1.439 2.805 0 3.552L9.92 30.486C8.589 31.176 7 30.21 7 28.71V7.29Z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{width:'100vw',height:'100vh',display:'block',position:'relative'}} ref={spaceShader}>

                        </div>
                        <div id="home-featured" className="section">
                            <div id="home-featured-title-top">
                                <div id="home-featured-title-wrapper">
                                    <h4 id="home-featured-title">
                                        Featured Work
                                    </h4>
                                </div>
                                <div id="home-featured-disclaimer">
                                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                                        <div className="line" style={{ display: 'block', textAlign: 'start', width: '100%' }}>a Selection of our most passionately</div>
                                    </div>
                                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                                        <div className="line" style={{ display: 'block', textAlign: 'start', width: '100%' }}>crafted works with forward-thinking</div>
                                    </div>
                                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                                        <div className="line" style={{ display: 'block', textAlign: 'start', width: '100%' }}>clients and friends over the years.</div>
                                    </div>
                                </div>
                            </div>
                            <div className="project-list">
                                <a className="project-item project-type-website" data-id="porsche_dream_machine" data-color-bg="#EFD5D3" data-color-text="#000000" data-color-shadow="0.95">
                                    <div className="project-item-main">
                                        <div className="project-item-image"></div>
                                    </div>
                                    <div className="project-item-footer">
                                        <div className="project-item-line-1">concept • 3D illustration • mograph • video</div>
                                        <div className="project-item-line-2">
                                            <div className="project-item-line-2-icon"></div>
                                            <div className="project-item-line-2-inner">
                                               Poscher: Dream Machine
                                            </div>

                                        </div>
                                    </div>
                                </a>
                                <a className="project-item project-type-website" data-id="porsche_dream_machine" data-color-bg="#EFD5D3" data-color-text="#000000" data-color-shadow="0.95">
                                    <div className="project-item-main">
                                        <div className="project-item-image"></div>
                                    </div>
                                    <div className="project-item-footer">
                                        <div className="project-item-line-1">concept • 3D illustration • mograph • video</div>
                                        <div className="project-item-line-2">
                                            <div className="project-item-line-2-icon"></div>
                                            <div className="project-item-line-2-inner">
                                            Poscher: Dream Machine
                                            </div>

                                        </div>
                                    </div>
                                </a>
                                <a className="project-item project-type-website" data-id="porsche_dream_machine" data-color-bg="#EFD5D3" data-color-text="#000000" data-color-shadow="0.95">
                                    <div className="project-item-main">
                                        <div className="project-item-image"></div>
                                    </div>
                                    <div className="project-item-footer">
                                        <div className="project-item-line-1">concept • 3D illustration • mograph • video</div>
                                        <div className="project-item-line-2">
                                            <div className="project-item-line-2-icon"></div>
                                            <div className="project-item-line-2-inner">
                                            Poscher: Dream Machine
                                            </div>

                                        </div>
                                    </div>
                                </a>
                                <a className="project-item project-type-website" data-id="porsche_dream_machine" data-color-bg="#EFD5D3" data-color-text="#000000" data-color-shadow="0.95">
                                    <div className="project-item-main">
                                        <div className="project-item-image"></div>
                                    </div>
                                    <div className="project-item-footer">
                                        <div className="project-item-line-1">concept • 3D illustration • mograph • video</div>
                                        <div className="project-item-line-2">
                                            <div className="project-item-line-2-icon"></div>
                                            <div className="project-item-line-2-inner">
                                            Poscher: Dream Machine
                                            </div>

                                        </div>
                                    </div>
                                </a>
                                <a className="project-item project-type-website" data-id="porsche_dream_machine" data-color-bg="#EFD5D3" data-color-text="#000000" data-color-shadow="0.95">
                                    <div className="project-item-main">
                                        <div className="project-item-image"></div>
                                    </div>
                                    <div className="project-item-footer">
                                        <div className="project-item-line-1">concept • 3D illustration • mograph • video</div>
                                        <div className="project-item-line-2">
                                            <div className="project-item-line-2-icon"></div>
                                            <div className="project-item-line-2-inner">
                                            Poscher: Dream Machine
                                            </div>

                                        </div>
                                    </div>
                                </a>
                                <a className="project-item project-type-website" data-id="porsche_dream_machine" data-color-bg="#EFD5D3" data-color-text="#000000" data-color-shadow="0.95">
                                    <div className="project-item-main">
                                        <div className="project-item-image"></div>
                                    </div>
                                    <div className="project-item-footer">
                                        <div className="project-item-line-1">concept • 3D illustration • mograph • video</div>
                                        <div className="project-item-line-2">
                                            <div className="project-item-line-2-icon"></div>
                                            <div className="project-item-line-2-inner">
                                            Poscher: Dream Machine
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <a id="home-featured-cta"  href='/gallery'>
                                <span id="home-featured-cta-dot"></span><span id="home-featured-cta-text">See all projects</span>
                                <span id="home-featured-cta-arrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                        <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984"></path>
                                    </svg>
                                </span>
                            </a>
                        </div>

                    </div>
                </div>
                <div id="page-extra-sections" >
                    <div id="footer-section" className="section">
                        <div id="footer-bg"></div>
                        <div id="footer-top"></div>
                        <div id="footer-middle">
                            <div id="footer-middle-contact">
                                <a id="footer-contact-address" href="https://goo.gl/maps/x9evc1NxZocjrM947" target="_blank">
                                    <div className="footer-address-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div className="footer-address-line">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>62/193</div>
                                        </div>
                                    </div>
                                    <div className="footer-address-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div className="footer-address-line">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Ly Chinh Thang</div>
                                        </div>
                                    </div>
                                    <div className="footer-address-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div className="footer-address-line">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Quan 3</div>
                                        </div>
                                    </div>
                                    <div className="footer-address-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div className="footer-address-line">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>HCMC.</div>
                                        </div>
                                    </div>
                                </a>
                                <div id="footer-contact-socials">
                                    <div className="footer-socials-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <a className="footer-socials-line" href="https://twitter.com/lusionltd/" target="_blank">
                                            <svg className="footer-socials-line-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" style={{ display: 'inline-block', position: 'relative' }}>
                                                <path fill="#000" fillRule="evenodd" d="M6.948 18.113a.75.75 0 0 1-1.06-1.06l9.885-9.886H8.65a.75.75 0 1 1 0-1.5h9.682v9.682a.75.75 0 0 1-1.5 0v-7.12l-9.884 9.884Z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="footer-socials-text" style={{ display: 'inline-block', position: 'relative' }}>
                                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Twitter/X</div>
                                          
                                            </span>
                                        </a>
                                    </div>
                                    <div className="footer-socials-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <a className="footer-socials-line" href="https://www.instagram.com/lusionltd/" target="_blank">
                                            <svg className="footer-socials-line-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" style={{ display: 'inline-block', position: 'relative' }}>
                                                <path fill="#000" fillRule="evenodd" d="M6.948 18.113a.75.75 0 0 1-1.06-1.06l9.885-9.886H8.65a.75.75 0 1 1 0-1.5h9.682v9.682a.75.75 0 0 1-1.5 0v-7.12l-9.884 9.884Z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="footer-socials-text" style={{ display: 'inline-block', position: 'relative' }}>
                                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Instagram</div>
                                            </span>
                                        </a>
                                    </div>
                                    <div className="footer-socials-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <a className="footer-socials-line" href="https://www.linkedin.com/company/lusionltd/" target="_blank">
                                            <svg className="footer-socials-line-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" style={{ display: 'inline-block', position: 'relative' }}>
                                                <path fill="#000" fillRule="evenodd" d="M6.948 18.113a.75.75 0 0 1-1.06-1.06l9.885-9.886H8.65a.75.75 0 1 1 0-1.5h9.682v9.682a.75.75 0 0 1-1.5 0v-7.12l-9.884 9.884Z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="footer-socials-text" style={{ display: 'inline-block', position: 'relative' }}>
                                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Linkedin</div>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                                <div id="footer-contact-enquires">
                                    <div className="footer-enquires-header-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div id="footer-enquires-header">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Email</div>
                                         
                                        </div>
                                    </div>
                                    <div className="footer-enquires-link-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <a id="footer-enquires-link" href="mailto:vphcm@20stu.co">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>hello@lusion.co</div>
                                        </a>
                                    </div>
                                </div>
                                <div id="footer-contact-business">
                                    <div className="footer-business-header-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div id="footer-business-header">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>New</div>
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>business</div>
                                        </div>
                                    </div>
                                    <div className="footer-business-link-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <a id="footer-business-link" href="mailto:vphcm@20stu.co">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>business@lusion.co</div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div id="footer-middle-newsletter">
                                <div id="footer-newsletter-header">
                                    <div className="footer-newsletter-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <span className="footer-newsletter-line">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Subscribe to</div>
                                        </span>
                                    </div>
                                    <div className="footer-newsletter-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <span className="footer-newsletter-line">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>our newsletter</div>
                                        </span>
                                    </div>
                                </div>
                                <div id="footer-newsletter-input" className="--active">
                                    <div id="footer-newsletter-bg" style={{ transform: 'scale3d(1, 1, 1)' }}></div>
                                    <form id="footer-newsletter-form">
                                        <input id="footer-newsletter-input-field" type="email" name="EMAIL" autoComplete="email" placeholder="Your email" />
                                        <button type="submit" id="footer-newsletter-input-arrow" aria-label="Send newsletter form button" style={{ transform: 'scale(1)' }}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.9999 11.9998C1.9999 12.552 2.44762 12.9997 2.9999 12.9997H18.9757C18.8901 13.148 18.7838 13.2876 18.657 13.4144L12.2931 19.7784C11.9025 20.1689 11.9025 20.8021 12.2931 21.1926C12.6836 21.5831 13.3168 21.5831 13.7073 21.1926L22.1926 12.7073C22.5831 12.3168 22.5831 11.6836 22.1926 11.2931L22.1924 11.293L13.7071 2.80767C13.3166 2.41715 12.6834 2.41715 12.2929 2.80767C11.9024 3.1982 11.9024 3.83136 12.2929 4.22189L18.657 10.586C18.7836 10.7126 18.8896 10.8518 18.9752 10.9998H2.9999C2.44762 10.9997 1.9999 11.4475 1.9999 11.9998Z" fill="black"></path>
                                            </svg>
                                        </button>
                                    </form>
                                    <div id="footer-newsletter-feedback-message"></div>
                                </div>
                            </div>
                        </div>
                        <div id="footer-bottom">
                            <div id="footer-bottom-copyright">
                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>20 Creative Studio ©2023</div>
                            </div>
                            <a id="footer-bottom-labs" href="https://labs.lusion.co" target="_blank">
                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>R&amp;D: labs.tadstu.co</div>
                            </a>
                            <div id="footer-bottom-tagline">
                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>Built by TAD with ❤️</div>
                            </div>
                            <div id="footer-bottom-up" style={{ transform: 'scale(1)' }} onClick={handleButtonClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" style={{ display: 'inline-block', position: 'relative' }}>
                                    <path fill="#fff" fillRule="evenodd" d="M12 22a1 1 0 0 1-1-1V5.857l-6.223 6.224a1 1 0 0 1-1.415-1.415l7.9-7.9a1 1 0 0 1 1.414 0v.001l7.9 7.9a1 1 0 0 1-1.414 1.414L13 5.919V21a1 1 0 0 1-1 1Z" clipRule="evenodd"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" style={{ display: 'inline-block', position: 'relative' }}>
                                    <path fill="#fff" fillRule="evenodd" d="M12 22a1 1 0 0 1-1-1V5.857l-6.223 6.224a1 1 0 0 1-1.415-1.415l7.9-7.9a1 1 0 0 1 1.414 0v.001l7.9 7.9a1 1 0 0 1-1.414 1.414L13 5.919V21a1 1 0 0 1-1 1Z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
      
      </main>


    <div >
   
  
    </div>
    <Canvas eventSource={ref} id="canvas" gl={{ antialias: false }} performance={{ min: 0.1,max:0.2 }}>
        <Stats />
      {/*   <Perf deepAnalyze={true} /> */}
        <Suspense fallback={ <Loader/>}>

        <View index={2}  track={boxPhysic}>
            <BallLusion accent={colorNew} action={true}/> 
          {/*   <PerspectiveCamera makeDefault far={100} fov={36} position={[0, 0, 6]} /> */}
           
        </View>
        <View  index={1} track={fixedView}>
             <FBOScene multisample samples={3} stencilBuffer={false} format={THREE.RGBAFormat} /> 
          {/*  <FBOSceneSim   /> */}
            {/*  <BoxGeomestry position={[0,0,0]}/> */}
         
         {/*     <EffSimuControls/> */}
        </View>
        <View track={spaceShader}>
           {/*  <SpaceWelcome/> */}
        </View>
       
       {/*  <EffectCP/> */}

        {/* <EffectComposerCustom /> */}
        <Preload all />

        </Suspense>
      </Canvas>  
    
      
    </>
  )
}



function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress()
    return <Html center>{progress} % loaded</Html>
}
const EffectComposerCustom = () => {
    <>
    <EffectComposer>
  
    </EffectComposer>
    </>
}
const EffNEnvBallLusion = () => {
  <>
    <EffectComposer disableNormalPass multisampling={8}>
      <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
    </EffectComposer>
    <Environment resolution={256}>
      <group rotation={[-Math.PI / 3, 0, 1]}>
        <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
        <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
        <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
        <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
      </group>
    </Environment>
  </>
}
{/*   <View track={trackViewFooter}>
          <FooterSpace position={[0, 0, 4.6]} />
          <PerspectiveCamera makeDefault fov={20} />
        </View> */}


        
