"use client"
import Common from "./Common";
import {Scene,Camera,RawShaderMaterial,Mesh,PlaneGeometry} from "three";


export default class ShaderPass{
    constructor(props){
        this.props = props;
        this.uniforms = this.props.material?.uniforms;
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