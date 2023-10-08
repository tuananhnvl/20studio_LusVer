/* "use client"
import * as THREE from "three"
import { useFrame, useThree } from "@react-three/fiber"
import { Outlines, useTexture } from "@react-three/drei"
import { Physics, useSphere,Debug  } from "@react-three/cannon"

import { useControls } from "leva"

const rfs = THREE.MathUtils.randFloatSpread
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const countBall = 20
export default function BallPhysic() {
  return (
    <Physics gravity={[0, 4, 0]} iterations={3}>
        <Debug color="black" scale={1.0}>
          <Cursor />
          <Ball />
        </Debug>
    </Physics>
  )
}

function Ball({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
const [ base1, normal1, rough1,ambient1,heigh1 ] = useTexture(["./fabric/Substance_Graph_BaseColor.jpg","./fabric/Substance_Graph_Normal.jpg","./fabric/Substance_Graph_Roughness.jpg","./fabric/Substance_Graph_AmbientOcclusion.jpg","./fabric/Substance_Graph_Height.png"])
const [ base2, normal2, rough2,ambient2,heigh2 ] = useTexture(["./fabric2/Fabric_Knitted_006_basecolor.jpg","./fabric2/Fabric_Knitted_006_normal.jpg","./fabric2/Fabric_Knitted_006_roughness.jpg","./fabric2/Fabric_Knitted_006_ambientOcclusion.jpg","./fabric2/Fabric_Knitted_006_height.png"])

  const fabricMaterial1 = new THREE.MeshStandardMaterial({ 
  //  color:"transparent",
    map:base1,
    normalMap:normal1,
    roughnessMap:rough1,
    displacementMap:heigh1,
    displacementScale:.02,
    roughness:.3, 
    envMapIntensity: 1 
  })
  const fabricMaterial2 = new THREE.MeshStandardMaterial({ 
    //  color:"transparent",
      map:base2,
      normalMap:normal2,
      roughnessMap:rough2,
      displacementMap:heigh2,
      displacementScale:.05,
      roughness:1.,
      emissive:  0x1d4fa7,
      emissiveMap: ambient2,
      envMapIntensity: 1 
    })
  

  
  const [ref, api] = useSphere(() => ({ args: [1], mass: 1, angularDamping: 0.1, linearDamping: 0.65, position: [rfs(20), rfs(20), rfs(20)] }))
  useFrame((state) => {
    for (let i = 0; i < countBall; i++) {
      // Get current whereabouts of the instanced sphere
      ref.current.getMatrixAt(i, mat)
      // Normalize the position and multiply by a negative force.
      // This is enough to drive it towards the center-point.
      api.at(i).applyForce(vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-40).toArray(), [0, 0, 0])
    }
  })
  return (
    <instancedMesh ref={ref} castShadow receiveShadow args={[sphereGeometry, fabricMaterial2, countBall]}>
      
    </instancedMesh>
  )
}

function Cursor() {
  const viewport = useThree((state) => state.viewport)
  const [, api] = useSphere(() => ({ type: "Kinematic", args: [1.5], position: [0, 0, 3] }))
  return useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0))
}
 */