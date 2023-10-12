"use client"

import { FACE_VERT,PRESSURE_FRAG } from "./glsl/ShaderAll";
import ShaderPass from "./ShaderPass";

export default class Divergence extends ShaderPass{
    constructor(simProps){
        super({
            material: {
                vertexShader: FACE_VERT,
                fragmentShader: PRESSURE_FRAG,
                uniforms: {
                    boundarySpace: {
                        value: simProps.boundarySpace
                    },
                    pressure: {
                        value: simProps.src_p.texture
                    },
                    velocity: {
                        value: simProps.src_v.texture
                    },
                    px: {
                        value: simProps.cellScale
                    },
                    dt: {
                        value: simProps.dt
                    }
                }
            },
            output: simProps.dst
        });

        this.init();
    }

    update({vel, pressure}){
        this.uniforms.velocity.value = vel.texture;
        this.uniforms.pressure.value = pressure.texture;
        super.update();
    }
    
}