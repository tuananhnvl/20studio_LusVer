"use client"

import { MOUSE_VERT, EXTARNALFORCE_FRAG } from "./glsl/ShaderAll";
import ShaderPass from "./ShaderPass";
import Mouse from "./Mouse";

import {Mesh,Vector2,RawShaderMaterial,AdditiveBlending,PlaneGeometry} from "three";

export default class ExternalForce extends ShaderPass{
    constructor(simProps){
        super({
            output: simProps.dst
        });

        this.init(simProps);
    }

    init(simProps){
        super.init();
        const mouseG = new PlaneGeometry(
            1, 1
        );

        const mouseM = new RawShaderMaterial({
            vertexShader: MOUSE_VERT,
            fragmentShader: EXTARNALFORCE_FRAG,
            blending: AdditiveBlending,
            uniforms: {
                px: {
                    value: simProps.cellScale
                },
                force: {
                    value: new Vector2(0.0, 0.0)
                },
                center: {
                    value: new Vector2(0.0, 0.0)
                },
                scale: {
                    value: new Vector2(simProps.cursor_size, simProps.cursor_size)
                }
            },
        })

        this.mouse = new Mesh(mouseG, mouseM);
        this.scene.add(this.mouse);
    }

    update(props){
        const forceX = Mouse.diff.x / 2 * props.mouse_force;
        const forceY = Mouse.diff.y / 2 * props.mouse_force;

        const cursorSizeX = props.cursor_size * props.cellScale.x;
        const cursorSizeY = props.cursor_size * props.cellScale.y;

        const centerX = Math.min(Math.max(Mouse.coords.x, -1 + cursorSizeX + props.cellScale.x * 2), 1 - cursorSizeX - props.cellScale.x * 2);
        const centerY = Math.min(Math.max(Mouse.coords.y, -1 + cursorSizeY + props.cellScale.y * 2), 1 - cursorSizeY - props.cellScale.y * 2);

        const uniforms = this.mouse.material.uniforms;

        uniforms.force.value.set(forceX, forceY);
        uniforms.center.value.set(centerX, centerY);
        uniforms.scale.value.set(props.cursor_size, props.cursor_size);

        super.update();
    }

}