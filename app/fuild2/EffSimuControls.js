"use client"

import { useRef, useEffect } from 'react';
import { useFrame, Canvas, useThree } from '@react-three/fiber';
import Simulation from './modules/Simulation'
import Common from './modules/Common'
import Mouse from './modules/Mouse'
import Output from "./modules/Output.js";

import { FACE_VERT,COLOR_FRAG } from './modules/glsl/ShaderAll';
import * as THREE from 'three'

export default function  EffSimuControls() {
    const { gl } = useThree()
    const simulationCurrent = useRef(null)
    const outputCurrent = useRef(null)
    const matRef = useRef(null)
    const status = useRef(false)
 
    useEffect(() => {
      const simulation = new Simulation();
        simulationCurrent.current = simulation
        Common.init(gl);
        Mouse.init()
        simulation.init();
        console.log(simulation)


        matRef.current = new THREE.RawShaderMaterial({
            vertexShader: FACE_VERT,
            fragmentShader: COLOR_FRAG,
            uniforms: {

                velocity: {
                    value: simulation.fbos.vel_0.texture
                },
                something: {
                    value: simulation.fbos.pressure_1.texture
                },
                boundarySpace: {
                    value: new THREE.Vector2()
                }
            },
            wireframe: false,
            transparent: true,
            depthTest:true
        })

        status.current = true
    }, [])
    useFrame(() => {
    
        if (status.current) {
          Mouse.update()
          simulationCurrent.current.update();
      
        }
    });

    return   <group position={[0, 0, 0]}>
    <mesh material={matRef.current}>
        <planeGeometry args={[2, 2]} />
       
    </mesh>
</group>
}
