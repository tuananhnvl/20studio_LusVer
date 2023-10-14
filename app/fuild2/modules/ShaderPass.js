"use client"
import Common from "./Common";
import {Scene,Camera,RawShaderMaterial,Mesh,PlaneGeometry} from "three";

export default class ShaderPass{
    constructor(props){
        this.props = props;
        this.uniforms = this.props.material?.uniforms;
        this.arr = [
            '3cd2dad6-bc62-43bc-bdec-4334b353d551',
            '7813d847-64e9-4f1e-b030-9a411bba94a8',
            'e6575c6b-1e1e-49e0-b6a3-da10a0037b20',
            'f9a05383-4ba9-45de-a5d8-1a2f662be742',
            '058e3c0c-8a32-4565-9ea5-59a60b592746',
            '079d643f-ffe0-45d9-99c4-46eb3b817eac',
            '5ee32e5a-8d46-4292-ba45-4e757269cd5e'
        ]
         
    }

    init(){
        this.scene = new Scene();
        this.camera = new Camera();

        if(this.uniforms){
            this.material = new RawShaderMaterial(this.props.material);
            this.geometry = new PlaneGeometry(2.0, 2.0);
            this.plane = new Mesh(this.geometry, this.material);
         
            this.scene.add(this.plane);
        }
      
    }

    update(){
  
        Common.renderer.setRenderTarget(this.props.output);
        Common.renderer.render(this.scene, this.camera);
        Common.renderer.setRenderTarget(null);
     
    }
}