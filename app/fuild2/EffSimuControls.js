"use client"

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import Simulation from './modules/Simulation'
import Common from './modules/Common'
import Mouse from './modules/Mouse'

import { FACE_VERT,COLOR_FRAG } from './modules/glsl/ShaderAll';
import {AdditiveBlending,Mesh,PlaneGeometry,BoxGeometry,RawShaderMaterial,Vector2,Group,MeshBasicMaterial} from 'three'


export default function  EffSimuControls() {
    const { gl,scene } = useThree()
    const simulationCurrent = useRef(null)

    console.log(gl,scene)
    useEffect(() => {
        const simulation = new Simulation();
        simulationCurrent.current = simulation
        Common.init(gl);
        Mouse.init()
        simulation.init();
      


        const geo = new PlaneGeometry(2,2)
        const mat = new RawShaderMaterial({
            vertexShader: FACE_VERT,
            fragmentShader: COLOR_FRAG,
            uniforms: {
          
                vel_1: {
                    value: simulation.fbos.vel_1.texture
                },
                vel_0: {
                    value: simulation.fbos.vel_0.texture
                },
                pressure_0 :{
                    value: simulation.fbos.pressure_0.texture
                },
                pressure_1: {
                    value: simulation.fbos.pressure_1.texture
                },
                boundarySpace: {
                    value: new Vector2()
                }
            },
            wireframe: false,
            transparent:true,
            depthTest:true
        })
        const mesh = new Mesh(geo,mat)
      
        let sd  =  new Mesh(new BoxGeometry(1,1,1),new MeshBasicMaterial({color:'blue'}))
        sd.position.set(0,0,2) 
        const group = new Group()
        group.name = 'Simulation'
        group.add(mesh,sd)
        scene.add(group) 
      
       
      // /  scene.add(aa)
        
    }, [])
    useFrame(() => {
  
        if (simulationCurrent.current) {
          //  console.log(simulationCurrent.current.fbos.vel_1.texture)
          Mouse.update()
          simulationCurrent.current.update();
        }
    });

    return (null)
}
