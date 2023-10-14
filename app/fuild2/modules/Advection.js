"use client"

import {FACE_VERT,LINE_VERT,ADVECTION_FRAG} from "./glsl/ShaderAll";
import ShaderPass from "./ShaderPass";
import {BufferGeometry,BufferAttribute,RawShaderMaterial,LineSegments} from "three";

export default class Advection extends ShaderPass{
    constructor(simProps){
        super({
            material: {
                vertexShader: FACE_VERT,
                fragmentShader: ADVECTION_FRAG,
                uniforms: {
                    boundarySpace: {
                        value: simProps.cellScale
                    },
                    px: {
                        value: simProps.cellScale
                    },
                    fboSize: {
                        value: simProps.fboSize
                    },
                    velocity: {
                        value: simProps.src.texture
                    },
                    dt: {
                        value: simProps.dt
                    },
                    isBFECC: {
                        value: true
                    }
                },
            },
            output: simProps.dst
        });

        this.init();
    }

    init(){
        super.init();
        this.createBoundary();
    }

    createBoundary(){
        const boundaryG = new BufferGeometry();
        const vertices_boundary = new Float32Array([
            // left
            -1, -1, 0,
            -1, 1, 0,

            // top
            -1, 1, 0,
            1, 1, 0,

            // right
            1, 1, 0,
            1, -1, 0,

            // bottom
            1, -1, 0,
            -1, -1, 0
        ]);
        boundaryG.setAttribute( 'position', new BufferAttribute( vertices_boundary, 3 ) );

        const boundaryM = new RawShaderMaterial({
            vertexShader: LINE_VERT,
            fragmentShader: ADVECTION_FRAG,
            uniforms: this.uniforms,
        });

        this.line = new LineSegments(boundaryG, boundaryM);
        this.scene.add(this.line);
    }

    update({ dt, isBounce, BFECC }){

        this.uniforms.dt.value = dt;
        this.line.visible = isBounce;
        this.uniforms.isBFECC.value = BFECC;

        super.update();
    }
}