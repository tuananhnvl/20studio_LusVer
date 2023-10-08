const fragmentShader = `
uniform float u_time;
uniform vec2 uSizes;

varying vec3 vUv;
uniform sampler2D u_texture;

vec3 colorA = vec3(0.912,0.191,0.652);
vec3 colorB = vec3(1.000,0.777,0.052);

void main() {
  vec3 uv = vUv;
  if(uv.z < 0.){
    gl_FragColor = vec4(colorA,1.);
  }else{
    //gl_FragColor = ;
    vec4 tex = texture2D(u_texture, uv.xy);

    gl_FragColor = vec4(tex);
  };
  gl_FragColor = texture2D(u_texture, uv.xy) * vec4(1.0,0.4,0.4,0.1);
}

`

export default fragmentShader
/* const videoFrag = `#define GLSLIFY 1
uniform sampler2D u_screenPaintTexture;uniform vec2 u_resolution;uniform vec3 u_color;uniform sampler2D u_texture;uniform vec2 u_textureSize;uniform float u_time;uniform vec2 u_radialCenter;uniform float u_showRatio;uniform float u_globalRadius;uniform float u_aspectScale;varying vec2 v_uv;varying vec2 v_domWH;varying float v_showRatio;
#include <getBlueNoise>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float sdRoundedBox(in vec2 p,in vec2 b,in float r){vec2 q=abs(p)-b+r;return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r;}float getRoundedCornerMask(vec2 uv,vec2 size,float radius,float ratio){vec2 halfSize=size*0.5;float maxDist=length(halfSize);float minSize=min(halfSize.x,halfSize.y);float maxSize=max(halfSize.x,halfSize.y);float t=ratio*maxDist;radius=mix(minSize*linearStep(0.,minSize,t),radius,linearStep(maxSize,maxDist,t));halfSize=min(halfSize,vec2(t));float d=sdRoundedBox((uv-.5)*v_domWH,halfSize,radius);return smoothstep(0.,0.-fwidth(d),d);}void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(6.,25.));float imageAlpha=getRoundedCornerMask(v_uv,v_domWH,u_globalRadius,1.0);vec2 baseUv=v_uv;float toRadialCenterDist=length((baseUv-u_radialCenter)*vec2(v_domWH.x/v_domWH.y,1.));baseUv.y=(baseUv.y-.5)*mix(1.,u_aspectScale,v_showRatio)+0.5;vec3 color=texture2D(u_texture,baseUv).rgb;vec3 tintedColor=max(u_color,vec3(dot(color,vec3(0.299,0.587,0.114))));gl_FragColor=vec4(mix(tintedColor,color,v_showRatio),imageAlpha);}`
   */