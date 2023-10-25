export const ADVECTION_FRAG = `
precision highp float;
uniform sampler2D velocity;
uniform float dt;
uniform bool isBFECC;
// uniform float uvScale;
uniform vec2 fboSize;
uniform vec2 px;
varying vec2 uv;

void main(){
    vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;

    if(isBFECC == false){
        vec2 vel = texture2D(velocity, uv).xy;
        vec2 uv2 = uv    -   vel * dt * ratio; //doidau
        vec2 newVel = texture2D(velocity, uv2).xy;
        gl_FragColor = vec4(newVel, 0.0, 0.0);
    } else {
        vec2 spot_new = uv;
        vec2 vel_old = texture2D(velocity, uv).xy;
        // back trace
        vec2 spot_old = spot_new - vel_old * dt * ratio;
        vec2 vel_new1 = texture2D(velocity, spot_old).xy;

        // forward trace
        vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
        
        vec2 error = spot_new2 - spot_new;

        vec2 spot_new3 = spot_new - error / 2.0;
        vec2 vel_2 = texture2D(velocity, spot_new3).xy;

        // back trace 2
        vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
        // gl_FragColor = vec4(spot_old2, 0.0, 0.0);
        vec2 newVel2 = texture2D(velocity, spot_old2).xy; 
        gl_FragColor = vec4(newVel2, 0.0, 0.0);
    }
}

`
export const BASE_VERT = `
precision highp float;

uniform vec2 px;
uniform vec2 boundarySpace;
uniform sampler2D pressure_1;
uniform float uTime;
varying vec2 vUv;



void main(){

    vec3 checkv2Tex =  texture2D(pressure_1,position.xy + 0.5).xyz;

    vec3 posGet = position;
    posGet /= 2.;
    posGet.x += sin(uv.y * 2.0 + uTime) * 0.0002;
    //posGet.y += sin(uv.x * 2.0 + uTime) * 0.02;
    posGet.x -= checkv2Tex.x / 100.;
    vUv = position.xy;

    gl_Position = vec4(posGet,1.);
}

`
export const COLOR_BASE = ` 
    precision highp float;
    uniform sampler2D vel_1;
    uniform sampler2D pressure_1;
    uniform sampler2D vel_0;
    uniform sampler2D pressure_0;
    uniform sampler2D uImg;
    varying vec2 vUv;

    void main() {
        vec4 color = vec4(0.3,0.5,0.9,1. );
        vec2 uvs = vUv;
        
        uvs += .5;
        uvs /= 3.;
        vec4 img = texture2D(uImg,uvs);
        vec4 ext =  texture2D(pressure_1,uvs);
        vec4 re = ext; 
        vec4 fi = vec4(re.xyz,.005);
        gl_FragColor = img; 
    }
`
export const COLOR_FRAG = `
    precision highp float;
    uniform sampler2D vel_1;
    uniform sampler2D pressure_1;
    uniform sampler2D vel_0;
    uniform sampler2D pressure_0;
    varying vec2 uv;

    void main(){
        vec2 vel = texture2D(pressure_1, uv).xy;
        float len = length(vel);
         vel = vel * 0.5 + 0.5;
       
        vec3 color = vec3(vel.x, vel.y, 1.0);
         color = mix(vec3(0.), color, len);
       
      gl_FragColor = vec4(color,1.);
 
   
      
       
    }

`  
/* with in fbo 

*/
/*    wihout fbo
      vec3 t = texture2D(pressure_1, uv).rgb;   
        vec3 r  =  t;
        float a = (r.x - .1);
        if(r.r < 0.1 && r.b < 0.1) {
            r=vec3(1.,1.,1.);
        } 
        gl_FragColor = vec4(  r ,a * .1);

*/
export const DIVERGENCE_FRAG = `
precision highp float;
uniform sampler2D velocity;
uniform float dt;
uniform vec2 px;
varying vec2 uv;

void main(){ 
    //   float x0 = texture2D(velocity, uv-vec2(px.x, 0)).x; split space
    float x0 = texture2D(velocity, uv+vec2(px.x, 0)).x;
    float x1 = texture2D(velocity, uv+vec2(px.x, 0)).x;
    float y0 = texture2D(velocity, uv-vec2(0, px.y)).y;
    float y1 = texture2D(velocity, uv+vec2(0, px.y)).y;
    float divergence = (x1-x0 + y1-y0) / 4.0;

    gl_FragColor = vec4(divergence / dt);
}

`

export const EXTARNALFORCE_FRAG = `
precision highp float;

uniform vec2 force;
uniform vec2 center;
uniform vec2 scale;
uniform vec2 px;
varying vec2 vUv;

void main(){
    vec2 circle = (vUv - 0.5) * 2.0;
    float d = 1.0-min(length(circle), 1.0);
    d *= d;
    gl_FragColor = vec4(force * d, 0, 1); 
    //gl_FragColor = vec4(1.,.5, 0, 1);
}

`

export const FACE_VERT = `
precision highp float;
attribute vec3 position;
uniform vec2 px;
uniform vec2 boundarySpace;
varying vec2 uv;



void main(){
    vec3 pos = position;
    vec2 scale = 1.0 - boundarySpace * 2.0;
    pos.xy = pos.xy * scale;
    uv = vec2(0.5)+(pos.xy)*0.5;
    gl_Position = vec4(pos, 1.0);
}

`

export const LINE_VERT = `
precision highp float;
attribute vec3 position;
varying vec2 uv;
uniform vec2 px;




void main(){
    vec3 pos = position;
    uv = 0.5 + pos.xy * 0.5;
    vec2 n = sign(pos.xy);
    pos.xy = abs(pos.xy) - px * 1.0;
    pos.xy *= n;
    gl_Position = vec4(pos, 1.0);
}`
export const MOUSE_VERT = `
precision highp float;
attribute vec3 position;
attribute vec2 uv;
uniform vec2 center;
uniform vec2 scale;
uniform vec2 px;
varying vec2 vUv;

void main(){
    vec2 pos = position.xy * scale * 2.0 * px + center;
    vUv = uv;
    gl_Position = vec4(pos, 0.0, 1.0);
}
`
export const POSSION_FRAG = `
precision highp float;
uniform sampler2D pressure;
uniform sampler2D divergence;
uniform vec2 px;
varying vec2 uv;
float maybeSize =  1.;
void main(){    
    // poisson equation
  
    float p0 = texture2D(pressure, uv+vec2(px.x * maybeSize,  0)).r;
    float p1 = texture2D(pressure, uv-vec2(px.x * maybeSize, 0)).r;
    float p2 = texture2D(pressure, uv+vec2(0, px.y * maybeSize )).r;
    float p3 = texture2D(pressure, uv-vec2(0, px.y * maybeSize )).r;
    float div = texture2D(divergence, uv).r;
    
    float newP = (p0   -  p1 + p2 + p3) / 3.0  -   div;
    gl_FragColor = vec4(newP);
}
`
export const PRESSURE_FRAG = `
precision highp float;
uniform sampler2D pressure;
uniform sampler2D velocity;
uniform vec2 px;
uniform float dt;
varying vec2 uv;



void main(){
    float step =  1. ;

    float p0 = texture2D(pressure, uv-vec2(px.x * step, 0)).r;
    float p1 = texture2D(pressure, uv-vec2(px.x * step, 0)).r;
    float p2 = texture2D(pressure, uv+vec2(0, px.y * step)).r;
    float p3 = texture2D(pressure, uv-vec2(0, px.y * step)).r;

    vec2 v = texture2D(velocity, uv).xy;
    vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;
     v = v - gradP * (dt);
        
    gl_FragColor = vec4(v, 0.0, 1.0);
}
`
export const VISCOUS_FRAG = `
precision highp float;
uniform sampler2D velocity;
uniform sampler2D velocity_new;
uniform float v;
uniform vec2 px;
uniform float dt;

varying vec2 uv;

void main(){
    // poisson equation
    vec2 old = texture2D(velocity, uv).xy;
    vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0)).xy;
    vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0)).xy;
    vec2 new2 = texture2D(velocity_new, uv + vec2(0, px.y * 2.0)).xy;
    vec2 new3 = texture2D(velocity_new, uv - vec2(0, px.y * 2.0)).xy;

    vec2 new = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);
    new /= 4.0 * (1.0 + v * dt);
    
    gl_FragColor = vec4(new, 0.0, 0.0);
}
`