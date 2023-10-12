"use client"

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'
import EffSimuControls from './EffSimuControls'


export default function Scene() {

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'fixed' }}>
            <Canvas>
                <group position={[0, 0, 3]}>
                    <mesh >
                        <boxGeometry args={[1, 1, 1]} />
                        <meshBasicMaterial color={'pink'} />
                    </mesh>
                </group>
                <EffSimuControls />
                <OrbitControls />
            </Canvas>
        </div>

    )
}