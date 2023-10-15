
"use client"
import * as THREE from 'three'
import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF,OrbitControls} from '@react-three/drei'
import { CuboidCollider, BallCollider, Physics, RigidBody } from '@react-three/rapier'
import { easing } from 'maath'

const accents = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00']

const shuffle = (accent = 0) => [
    { id:1,color: accents[accent], roughness: 0.75, accent: true },
    { id:2,color: '#20ffa0', roughness: 0.75 },
    { id:3,color: accents[accent], roughness: 0.75, accent: true },
    { id:4,color: 'white', roughness: 0.25 },
    { id:5,color: '#444', roughness: 0.25 },
    { id:6,color: accents[accent], roughness: 0.75, accent: true },
    { id:7,color: '#4060ff', roughness: 0.25 }
]

export const BallLusion = ({ accent }) => {
    const groupRef = useRef(null)
    useEffect(() => {
        groupRef.current.name = 'BallLusion'
    }, [groupRef])
    const connectors = useMemo(() => shuffle(accent), [accent])

    return (
        <>
            <color attach="background" args={['#141622']} />
            <ambientLight intensity={0.25} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <group ref={groupRef}>
                <Physics /* debug */ gravity={[0, 1, 0]} >
                    <Pointer />
                    {connectors.map((props, i) => <Connector key={i} {...props} />) /* prettier-ignore */}
                    {/*  <Connector position={[10, 10, 5]}>
                <Model>
                    <MeshTransmissionMaterial clearcoat={1} thickness={0.1} anisotropicBlur={0.1} chromaticAberration={0.1} samples={8} resolution={512} />
                </Model>
            </Connector>*/}
                </Physics>
            </group>
          {/*   <OrbitControls/> */}
        </>
    )
}
function Connector({ key, position, children, vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, accent, ...props }) {
    const api = useRef()
    const pos = useMemo(() => position || [r(2), r(2), r(2)], [])

    //['AS', 'AT','AU', 'AD','AI', 'AO','A2', 'AZ']
    const arrBody =  [[0.5, 0.3,.75], [0.6, 0.3, .75], [0.65, 0.3, .75], [0.55, 0.35, .7], [0.3, 0.3, .7], [0.55, 0.3, .7], [0.6, 0.35, .7]]  
     const arrPos = [[ 0,  0, 0],[  0,   .55, .1],[  0,   .6, 0],[  0,   0, 0],[  0,   0, 0],[  0,   0, 0],[  0,   0, 0]]
    console.log(props.id)
    useFrame((state, delta) => {
        delta = Math.min(0.1, delta)
        api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(1.))
    })
    return (
        <RigidBody linearDamping={4} angularDamping={1} friction={0.1} position={pos} ref={api} colliders={false}>
            {/*  <CuboidCollider args={[0.38, 1.27, 0.38]} /> */}
            {/*   */}
            
            <CuboidCollider args={ arrBody[ props.id  -   1]} />
            {children ? children : <Model {...props}  position={arrPos[props.id  -   1]}/>}
            {accent && <pointLight intensity={1} distance={1.5} color={props.color} />}
        </RigidBody>
    )
}

function Pointer({ vec = new THREE.Vector3() }) {
    const ref = useRef()
    useFrame(({ mouse, viewport }) => {
       ref.current?.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0))
    })
    return (
        <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
            <BallCollider args={[0.5]} />
        </RigidBody>
    )
}

function Model({ children, color = 'white', roughness = 0, ...props }) {
    const ref = useRef()
    const arr = ['AS', 'AT','AU', 'AD','AI', 'AO','A2', 'AZ']
    const { nodes } = useGLTF('/hi.glb')
    console.log(props)
 
    useFrame((state, delta) => {
        easing.dampC(ref.current.material.color, color, 0.5, delta)
    })
    return (

        <mesh ref={ref} castShadow receiveShadow scale={.042} geometry={nodes[`${arr[props.id  - 1]}`].geometry} position={props.position}>
        {/* <boxGeometry args={[1,1,1]}/> */}
        <meshStandardMaterial metalness={0.2} roughness={roughness} />
     
        {children}
    </mesh>   
       
       
    )
}


/* function Model({ children, color = 'white', roughness = 0, ...props }) {
    const ref = useRef()
  
    const { nodes } = useGLTF('/simple_alphabet.glb')
    console.log(nodes)
    useFrame((state, delta) => {
        easing.dampC(ref.current.material.color, color, 0.5, delta)
    })
    return (
        <mesh ref={ref} castShadow receiveShadow scale={.04} geometry={nodes.AS.children[0].geometry} position={[0.05, 0, -0.05]}>
          
            <meshStandardMaterial metalness={0.2} roughness={roughness} />

            {children}
        </mesh>
    )
}
 */