"use client"
import {useEffect,useRef} from 'react'
import { useFrame } from '@react-three/fiber';
export default function page() {
  const obj = useRef()
   useEffect(() => {
    window.addEventListener("devicemotion", (event) => {
        console.log(event)
        document.getElementById('sensor').innerHTML = `${event.acceleration.x,event.acceleration.y,event.acceleration.z}`
        //obj.current = `${event.acceleration.x,event.acceleration.y,event.acceleration.z}`
        document.getElementById('sensor3').innerHTML = `${event.accelerationIncludingGravity.x,event.accelerationIncludingGravity.y,event.accelerationIncludingGravity.z}`
      
    });

    function anime() {
      console.log(obj.current)

      
      requestAnimationFrame(anime)
    }
    anime()
    window.addEventListener("wheel", (event) => {
        document.getElementById('sensor1').innerHTML = `${JSON.stringify(event.deltaY)}`
        obj.current = `${JSON.stringify(event.deltaY)}`
    });
     
   },[])
   
  return (
    <div>
      <h1 id='sensor'></h1>
      <h1 id='sensor3'></h1>
      <h1 id='sensor4'></h1>
      <h1 id='sensor1'></h1>
    </div>
  )
}
