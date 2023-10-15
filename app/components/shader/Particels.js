
export const vertexShader = `
uniform float uTime;
uniform float uRadius;
uniform sampler2D uTextureSim;
// Source: https://github.com/dmnsgn/glsl-rotate/blob/main/rotation-3d-y.glsl.js
mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(
    c, 0.0, -s,
    0.0, 1.0, 0.0,
    s, 0.0, c
  );
}
varying vec3 vUv;

void main() {
   
  float distanceFactor = pow(uRadius - distance(position, vec3(0.0)), 1.5);
  vec3 particlePosition = position * rotation3dY(uTime * 0.3 * distanceFactor);




  vec3 pos = position;
  vec3 basePos = position;

  vec4 posTex = texture2D(uTextureSim,position.xy);

  vec3 roro = basePos * rotation3dY(uTime * 0.3 );
  vec4 modelPosition = modelMatrix * vec4(roro, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  vUv = position.xyz;
  gl_Position = projectedPosition;
  gl_PointSize = 4.0;
}

`
export const fragmentShader = `
uniform sampler2D uTextureSim;
varying vec3 vUv;
void main() {
    vec3 uv = vUv;
    uv += .5;
 
  gl_FragColor = texture2D(uTextureSim,uv.xy);
  
}
`

