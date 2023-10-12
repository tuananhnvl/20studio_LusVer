"use client"

import { FACE_VERT, DIVERGENCE_FRAG } from "./glsl/ShaderAll";
import ShaderPass from "./ShaderPass";

export default class Divergence extends ShaderPass{
    constructor(simProps){
        super({
            material: {
                vertexShader: FACE_VERT,
                fragmentShader: DIVERGENCE_FRAG,
                uniforms: {
                    boundarySpace: {
                        value: simProps.boundarySpace
                    },
                    velocity: {
                        value: simProps.src.texture
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
        })

        this.init();
    }

    update({ vel }){
        this.uniforms.velocity.value = vel.texture;
        super.update();
    }
}