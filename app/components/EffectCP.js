"use client"
import React, { useRef, useEffect } from 'react';
import { useThree, useFrame, extend } from '@react-three/fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import * as THREE from 'three';


extend({ EffectComposer, ShaderPass, RenderPass })

const shaderPass ={
  uniforms: {
      time: { value: 0 },
      tDiffuse: { value: null },
      depthTexture: { value: null},
      projectionMatrixInverse: {value: null},
      viewMatrixInverse: {value: null},
  },
  vertexShader: `
    varying vec2 vUv;
    void main () {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }        
  `,
  fragmentShader: `
    uniform float time;
    uniform sampler2D tDiffuse;
    uniform sampler2D depthTexture;
    varying vec2 vUv;

    uniform mat4 projectionMatrixInverse;
    uniform mat4 viewMatrixInverse;


    vec3 worldCoordinatesFromDepth(float depth) {
      float z = depth * 2.0 - 1.0;
  
      vec4 clipSpaceCoordinate = vec4(vUv * 2.0 - 1.0, z, 1.0);
      vec4 viewSpaceCoordinate = projectionMatrixInverse * clipSpaceCoordinate;
  
      viewSpaceCoordinate /= viewSpaceCoordinate.w;
  
      vec4 worldSpaceCoordinates = viewMatrixInverse * viewSpaceCoordinate;
  
      return worldSpaceCoordinates.xyz;
    }

    float sphereSDF(vec3 p, float radius) {
      return length(p) - radius;
    }
    
    void main() {
      float depth = texture( depthTexture, vUv ).x;
      vec3 worldPosition = worldCoordinatesFromDepth(depth);
      float radius = mod(0.1 * time * 10.0, 3.0);

      if (sphereSDF(worldPosition, radius) < 0.0 && sphereSDF(worldPosition, radius) > -1.0) {
        gl_FragColor = vec4(0.0,1.0,0.0,1.0);
      } else {
        vec3 sceneColor = texture(tDiffuse, vUv).xyz;
        gl_FragColor = vec4(sceneColor, 1.0);
      }
    }
  `
}

const EffectCP = () => {
  const composer = useRef();
  const ref = useRef()
  const { gl, size, scene, camera } = useThree();

  const [ target ] = React.useMemo(() => {
    const target = new THREE.WebGLRenderTarget(
       200,
       200,
        {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            stencilBuffer: false,
            depthBuffer: true,
            depthTexture: new THREE.DepthTexture()
        },
    );
    return [ target ];
  }, []);


  useEffect(() => {
    composer.current.setSize(size.width, size.height)
  }, [size])

  useFrame((state) => {
    state.gl.setRenderTarget(target);
    state.gl.render(scene, camera);
  
    if (ref.current) {
      ref.current.uniforms['depthTexture'].value =target.depthTexture;
      ref.current.uniforms['projectionMatrixInverse'].value = camera.projectionMatrixInverse;
      ref.current.uniforms['viewMatrixInverse'].value = camera.matrixWorld;
      ref.current.uniforms['time'].value = state.clock.elapsedTime;
    }
    composer.current.render()
  }, 1);
  
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <shaderPass attachArray="passes" ref={ref} args={[shaderPass]} needsSwap={false} renderToScreen />
    </effectComposer>
  )
}

export default EffectCP;