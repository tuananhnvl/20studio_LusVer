"use client"

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import Simulation from './modules/Simulation'
import Common from './modules/Common'
import Mouse from './modules/Mouse'

import { FACE_VERT,COLOR_FRAG,COLOR_BASE,BASE_VERT } from './modules/glsl/ShaderAll';
import {Mesh,PlaneGeometry,BoxGeometry,RawShaderMaterial,Vector2,Group,ShaderMaterial,TextureLoader} from 'three'


export default function  EffSimuControls() {
    const { gl,scene,viewport } = useThree()
    const simulationCurrent = useRef(null)
    const matTestMesh = useRef(null)
    let time = 0
    useEffect(() => {
        const simulation = new Simulation();
        simulationCurrent.current = simulation
        Common.init(gl);
        Mouse.init()
        simulation.init();
      
        const textureImg = new TextureLoader().load('./fabric.jpg' ); 

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
        matTestMesh.current = new ShaderMaterial({ 
            vertexShader: BASE_VERT,
            fragmentShader: COLOR_BASE,
            uniforms: {
                uTime: {
                    value:0
                },
                uImg : {value:textureImg},
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
            wireframe:false
        })
        const testMesh  =  new Mesh(new PlaneGeometry(2,2,42,42),matTestMesh.current)
        // this mesh will look like view port bacause something on fragment
        testMesh.name = 'testMesh'
        console.log(testMesh)
        const grouptestMesh = new Group()
        grouptestMesh.add(testMesh)
   
        const group = new Group()
        group.name = 'Simulation'
        group.add(mesh)
        
        scene.add(group) 
      
       
      // /  scene.add(aa)
        
    }, [])
    useFrame((state) => {
        const {clock} = state
       
        if (simulationCurrent.current) {
            
            matTestMesh.current.uniforms.uTime.value = clock.getElapsedTime()
          //  console.log(simulationCurrent.current.fbos.vel_1.texture)
          Mouse.update()
          simulationCurrent.current.update();
        }
    });

    return (null)
}
