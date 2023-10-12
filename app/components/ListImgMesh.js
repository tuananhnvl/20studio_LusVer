"use client"
import * as THREE from 'three'

import {useEffect,useRef} from 'react'
import { extend,useFrame } from '@react-three/fiber'
import {shaderMaterial} from '@react-three/drei'
const ColorShiftMaterial = shaderMaterial(
    { time: 0, color: new THREE.Color(0.2, 0.0, 0.1) },
    // vertex shader
    /*glsl*/`
    precision mediump float;

    varying vec3 vUv;
    uniform float time;
    

    void main() {
      
    
      vec3 pos = position;
      pos.x += sin(uv.y + time / 5. ) * 0.05;
      pos.y += sin(uv.x + time / 5. ) * 0.05;
      pos.z += sin(uv.x + time / 5. ) * 0.05;
    
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);  
       
      vUv = pos;
    }
    `,
    // fragment shader
    /*glsl*/`

      varying vec3 vUv;
      void main() {
        float a = 0.;
        if(vUv.z > 0.) {
            float a = 1.;
        }
      gl_FragColor = vec4(.9,.5,vUv.z * 10.,1.);
      }
    `
  )
  
  // declaratively
  extend({ ColorShiftMaterial })
const ListImgMesh = ({ ...props }) => {
    const groupRef = useRef();
    const count = 6;
    let time = 0
    const mapPosImg = [[-.5,.5],[.5,.5],[-.5,0],[.5,0],[.5,-.5],[-.5,-.5],[-.5,-1],[.5,-1]]
    useEffect(() => {
  
      for (let i = 0; i < count; i++) {
        let geometry = new THREE.PlaneGeometry(2.6, 1.4, 32, 32);
        //let material = new THREE.MeshBasicMaterial({ color: 'blue' , wireframe:true});
        let material = new ColorShiftMaterial({ color: new THREE.Color("hotpink"),wireframe:true })
        let mesh = new THREE.Mesh(geometry, material);
        let group = new THREE.Group()
        group.add(mesh)
        group.position.set(mapPosImg[i][0] * 3.6,mapPosImg[i][1] * 4,0);
        groupRef.current.add(group);
      }
    }, []);
    useFrame(() => {
        time  += .06
        for (let i = 0; i < groupRef.current.children.length; i++) {
            
            groupRef.current.children[i].children[0].material.uniforms.time.value = time
            
        }
        
    })
    return <group ref={groupRef} {...props} />;
  };
  

  export default  ListImgMesh