"use client"
import Common from "./Common";
import {RawShaderMaterial,PlaneGeometry,Vector2,Scene,Camera,Mesh} from "three";
import Simulation from "./Simulation";
import { COLOR_FRAG, FACE_VERT } from "./glsl/ShaderAll";
export default class Output{
    constructor(){
        this.init();
    }

    init(){
        this.simulation = new Simulation();

        this.scene = new Scene();
        this.camera = new Camera();

        this.output = new Mesh(
            new PlaneGeometry(2, 2),
            new RawShaderMaterial({
                vertexShader: FACE_VERT,
                fragmentShader: COLOR_FRAG,
                uniforms: {
                    velocity: {
                        value: this.simulation.fbos.vel_0.texture
                    },
                    boundarySpace: {
                        value: new Vector2()
                    }
                },
            })
        );

        this.scene.add(this.output);
    }
    addScene(mesh){
        this.scene.add(mesh);
    }

    resize(){
        this.simulation.resize();
    }

    render(){
        Common.renderer.setRenderTarget(null);
        Common.renderer.render(this.scene, this.camera);
    }

    update(){
        this.simulation.update();
        this.render();
    }
}