"use client"
import {useEffect,useRef} from 'react'
import { useFrame } from '@react-three/fiber';


function take_decimal_number(num,n){
  //num : số cần xử lý
  //n: số chữ số sau dấu phẩy cần lấy
  let base = 10**n;
  let result = Math.round(num * base) / base ;
  return result;
}

export default function page() {
  const obj = useRef()
   useEffect(() => {
    window.addEventListener("devicemotion", (event) => {
       // console.log(event)
        document.getElementById('accelerationX').innerHTML = `${take_decimal_number(event.acceleration.x,4)}`
        document.getElementById('accelerationY').innerHTML = `${take_decimal_number(event.acceleration.y,4)}`
        document.getElementById('accelerationIncludingGravityX').innerHTML = `${take_decimal_number(event.accelerationIncludingGravity.x,4)}`
        document.getElementById('accelerationIncludingGravityY').innerHTML = `${take_decimal_number(event.accelerationIncludingGravity.y,4)}`
    });
    window.addEventListener("deviceorientation", (event) => {
      // console.log(event)
       document.getElementById('zA').innerHTML = `${event.absolute}`
       document.getElementById('xA').innerHTML = `${event.alpha}`
       document.getElementById('yA').innerHTML = `${event.beta}`
      
   });
    function anime() {
      //console.log(obj.current)

      
      requestAnimationFrame(anime)
    }
    anime()
  /*   window.addEventListener("wheel", (event) => {
        document.getElementById('sensor1').innerHTML = `${JSON.stringify(event.deltaY)}`
        obj.current = `${JSON.stringify(event.deltaY)}`
    }); */
     
   },[])
   
  return (
    <div> 

           
      <div>zA::<h1 id='zA'></h1></div>
      <div>xA::<h1 id='xA'></h1></div>
      <div>yA::<h1 id='yA'></h1></div> 

       

      <div>accelerationX::<h1 id='accelerationX'></h1></div>
      <div>accelerationY::<h1 id='accelerationY'></h1></div>
      <div>accelerationIncludingGravityX::<h1 id='accelerationIncludingGravityX'></h1></div>
      <div>accelerationIncludingGravityY::<h1 id='accelerationIncludingGravityY'></h1></div> 



  
    </div>
  )
}
