"use client"
import { useEffect, useRef, Suspense } from 'react'
import { DeviceOrientationControls } from '../components/DeviceOrientationControls'
import { Canvas, useFrame, useThree, useLoader, axesHelper } from '@react-three/fiber'
import { BallLusion } from '../components/BallLusion'
import { Stats, OrbitControls, Environment, Html, useProgress } from '@react-three/drei'
import * as THREE from 'three'
/* https://ugpfn.csb.app/ */


function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}
function Controls() {
    const { camera,scene } = useThree()
    const controls = useRef()
    const ballFlolow = useRef()
    const target = new THREE.Vector3(0, 0, 0)
    useEffect(() => {
        const material = new THREE.LineBasicMaterial({
            color: 'white'
        });
        
        const points = [];
        points.push( new THREE.Vector3( camera.position.x,.5, camera.position.z) );
        points.push( new THREE.Vector3( 0, 0 , 0 ) );
        points.push( new THREE.Vector3( 1, 1, 1 ) );
        
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        
        const line = new THREE.Line( geometry, material );
        scene.add( line );

        controls.current = new DeviceOrientationControls(camera)
        controls.current.connect()

    })
    useFrame(() => {
        let s = Math.round(camera.position.y * 100) / 100 
        const vecCam = new THREE.Vector3(camera.position.x,s, camera.position.z )



        const targetToFlow = vecCam.negate()
        // Create a vector representing the origin (0,0,0)
        const origin = new THREE.Vector3(0, 0, 0);

        // Calculate the vector from the origin to the camera position
        const cameraToOrigin = vecCam.clone().sub(origin);

        // Calculate the symmetrical point by negating the vector and adding it to the origin
        const symmetricalPoint = origin.clone().add(cameraToOrigin.negate());
       // console.log(vecCam,symmetricalPoint)
        ballFlolow.current.position.x = -symmetricalPoint.x
      ballFlolow.current.position.y = symmetricalPoint.y
      ballFlolow.current.position.z = -symmetricalPoint.z 
        ballFlolow.current.rotation.x += .01
        //console.log(camera.position)
        //controls.current.update()
       // console.log(ballFlolow.current.position)
        /* const posObj = new THREE.Vector3(ballFlolow.current.position.x,ballFlolow.current.position.y,0)
       
        const interpolatedValue = new THREE.Vector3().lerpVectors(posObj, vecCam, .55);
        ballFlolow.current.position.copy(interpolatedValue); */
    })
    return (
        <group>
            <mesh >
                <sphereGeometry args={[5, 3, 2]} />
                <meshBasicMaterial color={'blue'} wireframe={true} />
            </mesh>
            <group ref={ballFlolow}>
                <mesh >
                    <boxGeometry args={[1, 1, 1]} />
                    <meshBasicMaterial color={'blue'} wireframe={false} />
                </mesh>
            </group>
        </group>
    )

}

function WarpperBall() {
    const ballLus = useRef()

    useFrame(() => {

        ballLus.current.rotation.x += .0001

    })
    return <group ref={ballLus}>
       {/*  <BallLusion action={false} /> */}
    </group>
}
export default function page() {


    return (
        <div style={{ width: '100vw', height: '100vh', position: 'fixed' }}>
            <Canvas>
                <Suspense fallback={<Loader />}>


                    <axesHelper args={[10, 10, 10]} />
                    <WarpperBall />
                    <Environment files="./hdr.hdr" background />
                    <Controls />
                    <OrbitControls />
                </Suspense>

            </Canvas>
        </div>
    )
}
