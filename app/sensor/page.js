"use client"
import {useEffect} from 'react'
export default function page() {
   useEffect(() => {
    window.addEventListener("devicemotion", (event) => {
        console.log(event)
        document.getElementById('sensor').innerHTML = `${event.acceleration.x,event.acceleration.y,event.acceleration.z}`
        document.getElementById('sensor3').innerHTML = `${event.accelerationIncludingGravity.x,event.accelerationIncludingGravity.y,event.accelerationIncludingGravity.z}`
      
    });
    window.addEventListener("wheel", (event) => {
        console.log(event)
        document.getElementById('sensor1').innerHTML = `${JSON.stringify(event.deltaY)}`
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
