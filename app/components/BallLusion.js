
"use client"
import * as THREE from 'three'
import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { CuboidCollider, BallCollider, Physics, RigidBody } from '@react-three/rapier'
import { easing } from 'maath'

const accents = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00']

const shuffle = (accent = 0) => [
    { color: accents[accent], roughness: 0.75, accent: true },
    { color: '#20ffa0', roughness: 0.75 },
    { color: '#444', roughness: 0.75 },
   //{ color: 'white', roughness: 0.1 },
    { color: 'white', roughness: 0.1},
    { color: accents[accent], roughness: 0.75, accent: true },
    { color: accents[accent], roughness: 0.1, accent: true }
]

export const BallLusion = ({accent}) => {
    const groupRef = useRef(null)
   useEffect(() => {
    groupRef.current.name = 'BallLusion'
   },[groupRef])
    const connectors = useMemo(() => shuffle(accent), [accent])
   
    return (
       <>
        <color attach="background" args={['#141622']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <group ref={groupRef}>
        <Physics /* debug */ gravity={[0, 1, 0]} >
            <Pointer />
            {connectors.map((props, i) => <Connector key={i} {...props} />) /* prettier-ignore */}
           {/*  <Connector position={[10, 10, 5]}>
                <Model>
                    <MeshTransmissionMaterial clearcoat={1} thickness={0.1} anisotropicBlur={0.1} chromaticAberration={0.1} samples={8} resolution={512} />
                </Model>
            </Connector>
            <Connector position={[10, 10, 5]}>
                <Model>
                    <MeshTransmissionMaterial clearcoat={1} thickness={0.1} anisotropicBlur={0.1} chromaticAberration={0.1} samples={8} resolution={512} />
                </Model>
            </Connector> */}
        </Physics>
        </group>
      
       </>
    )
}
function Connector({ position, children, vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, accent, ...props }) {
    const api = useRef()
    const pos = useMemo(() => position || [r(2), r(2), r(2)], [])
   
    useFrame((state, delta) => {
      //  console.log(localStorage.getItem('posCurrent'))
        delta = Math.min(0.1, delta)
        api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(1.))
    })
    return (
        <RigidBody linearDamping={4} angularDamping={1} friction={0.1} position={pos} ref={api} colliders={false}>
            <CuboidCollider args={[0.38, 1.27, 0.38]} />
            <CuboidCollider args={[1.27, 0.38, 0.38]} />
            <CuboidCollider args={[0.38, 0.38, 1.27]} />
            {children ? children : <Model {...props} />}
            {accent && <pointLight intensity={1} distance={2.5} color={props.color} />}
        </RigidBody>
    )
}

function Pointer({ vec = new THREE.Vector3() }) {
    const ref = useRef()
    useFrame(({ mouse, viewport }) => {
        ref.current?.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 7, (mouse.y * viewport.height) / 7, 0))
    })
    return (
        <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
            <BallCollider args={[1]} />
        </RigidBody>
    )
}

function Model({ children, color = 'white', roughness = 0, ...props }) {
    const ref = useRef()
    const { nodes, materials } = useGLTF('/c-transformed.glb')

    useFrame((state, delta) => {
        easing.dampC(ref.current.material.color, color, 0.5, delta)
    })
    return (
        <mesh ref={ref} castShadow receiveShadow scale={10} geometry={nodes.connector.geometry}>
            <meshStandardMaterial metalness={0.2} roughness={roughness} map={materials.base.map} />
            {children}
        </mesh>
    )
}
