'use client'

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import {vertexShader,fragmentShader} from './shader/Particels';

const CustomGeometryParticles = (props) => {
  const count = 2000;
  const radius = 1;
   

  const points = useRef();
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const distance = Math.sqrt(Math.random()) * radius;
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 

      let x = distance * Math.sin(theta) * Math.cos(phi)
      let y = distance * Math.sin(theta) * Math.sin(phi);
      let z = distance * Math.cos(theta);

      positions.set([x, y, z], i * 3);
    }
    
    return positions;
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: {
      value: 0.0
    },
    uRadius: {
      value: radius
    },
    uTextureSim :{
      value: null
    }
  }), [])

  useFrame((state) => {
    const { clock } = state;
    points.current.material.uniforms.uTextureSim.value = props.uTextureSim
    points.current.material.uniforms.uTime.value = clock.elapsedTime;
    points.current.rotation.x += 0.001
  });

  return (
    <points ref={points} position={[0,0,2]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </points>
  );
};

const SceneFBOParicels = ({uTextureSim}) => {
  console.log(uTextureSim)
  return (
    <CustomGeometryParticles uTextureSim={uTextureSim} count={4000} />
  );
};


export default SceneFBOParicels;
