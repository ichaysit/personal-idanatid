
/* ===== SHADERGRADIENT (port fidèle du shader « defaults / plane » : bruit 3D, plan 10x10, 192 segments) ===== */
;(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var W=Math.min(2400,Math.max(1100,Math.round(innerWidth*Math.min(devicePixelRatio||1,3)))),H=Math.round(W*9/16);
var gl,src=document.createElement('canvas');src.width=W;src.height=H;
try{gl=src.getContext('webgl',{antialias:true,preserveDrawingBuffer:true})}catch(e){}
if(!gl)return;
var VS="precision highp float;\nvec3 mod289(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\nfloat cnoise(vec3 P)\n{\n  vec3 Pi0 = floor(P); // Integer part for indexing\n  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n  Pi0 = mod289(Pi0);\n  Pi1 = mod289(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute(permute(ix) + iy);\n  vec4 ixy0 = permute(ixy + iz0);\n  vec4 ixy1 = permute(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); \n  return 2.2 * n_xyz;\n}\n\n\nattribute vec2 p;uniform float uTime,uSpeed,uNoiseDensity,uNoiseStrength;uniform mat4 uMVP;varying vec3 vPos;void main(){vec3 position=vec3(p,0.);float t=uTime*uSpeed;float d=.75*cnoise(.43*position*uNoiseDensity+t);vec3 pos=position+vec3(0.,0.,1.)*d*uNoiseStrength;vPos=pos;gl_Position=uMVP*vec4(pos,1.);}",FS="precision highp float;varying vec3 vPos;uniform vec3 c1,c2,c3,c4,c5;uniform float uLight,uT;\nfloat hh(vec2 q){return fract(sin(dot(q,vec2(12.9898,78.233)))*43758.5453);}\nvoid main(){float zz=vPos.z;vec3 base=mix(c1,c2,smoothstep(-1.,5.,vPos.x));base=mix(base,c3,smoothstep(.1,.9,zz));base=mix(base,c4,smoothstep(.0,.9,-zz));base=mix(base,c5,.55*smoothstep(-2.,3.,vPos.y)*(1.-smoothstep(.2,1.,abs(zz))));vec3 col=max(base,0.)*uLight;col=pow(clamp(col,0.,1.),vec3(1./2.2));col=clamp(mix(vec3(dot(col,vec3(.3,.59,.11))),col,1.55)*1.12,0.,1.);\ncol+=(hh(gl_FragCoord.xy+uT)-.5)*.035;gl_FragColor=vec4(col,1.);}";
function sh(t,s){var o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))console.warn('sg',gl.getShaderInfoLog(o));return o}
var pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);
if(!gl.getProgramParameter(pr,gl.LINK_STATUS))return;gl.useProgram(pr);
/* plan 10x10 : 1 segment en x, 192 en y (comme la bibliothèque) */
var N=160,R=15,P=[],IX=[];for(var j=0;j<=N;j++)for(var i=0;i<=N;i++)P.push(-R+2*R*i/N,R-2*R*j/N);
for(var j=0;j<N;j++)for(var i=0;i<N;i++){var q=j*(N+1)+i;IX.push(q,q+1,q+N+1,q+1,q+N+2,q+N+1)}
var vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(P),gl.STATIC_DRAW);
var ib=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ib);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(IX),gl.STATIC_DRAW);
var lp=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(lp);gl.vertexAttribPointer(lp,2,gl.FLOAT,false,0,0);
var U=function(n){return gl.getUniformLocation(pr,n)};
function lin(h){return[1,3,5].map(function(i){var c=parseInt(h.substr(i,2),16)/255;return c<=.04045?c/12.92:Math.pow((c+.055)/1.055,2.4)})}
var COL=['#16294d','#8f82d6','#efdea0','#90d5e8','#3070b0'].map(function(h){return[1,3,5].map(function(i){var c=parseInt(h.substr(i,2),16)/255;return c<=.04045?c/12.92:Math.pow((c+.055)/1.055,2.4)})});
gl.uniform3fv(U('c1'),COL[0]);gl.uniform3fv(U('c2'),COL[1]);gl.uniform3fv(U('c3'),COL[2]);gl.uniform3fv(U('c4'),COL[3]);gl.uniform3fv(U('c5'),COL[4]);
gl.uniform1f(U('uSpeed'),.23);gl.uniform1f(U('uNoiseDensity'),.8);gl.uniform1f(U('uNoiseStrength'),2.8);gl.uniform1f(U('uLight'),1.0);
var uT=U('uTime'),uG=U('uT'),uM=U('uMVP');gl.viewport(0,0,W,H);
function mul(a,b){var o=new Array(16);for(var c=0;c<4;c++)for(var r=0;r<4;r++){var s=0;for(var k=0;k<4;k++)s+=a[k*4+r]*b[c*4+k];o[c*4+r]=s}return o}
function rz(a){var c=Math.cos(a),s=Math.sin(a);return[c,s,0,0,-s,c,0,0,0,0,1,0,0,0,0,1]}
function ry(a){var c=Math.cos(a),s=Math.sin(a);return[c,0,-s,0,0,1,0,0,s,0,c,0,0,0,0,1]}
function tr(x,y,z){return[1,0,0,0,0,1,0,0,0,0,1,0,x,y,z,1]}
function sc(k){return[k,0,0,0,0,k,0,0,0,0,k,0,0,0,0,1]}
var f=1/Math.tan(14*Math.PI/360),A=W/H,n=.1,fa=100;
var PRJ=[f/A,0,0,0,0,f,0,0,0,0,(fa+n)/(n-fa),-1,0,0,2*fa*n/(n-fa),0];
var MODEL=mul(tr(-1.4,0,0),mul(ry(10*Math.PI/180),mul(rz(50*Math.PI/180),sc(1))));
var MVP=mul(PRJ,mul(tr(0,0,-14),MODEL));gl.uniformMatrix4fv(uM,false,new Float32Array(MVP));
function render(time,seed){gl.uniform1f(uT,time);gl.uniform1f(uG,seed);gl.clearColor(.02,.01,.09,1);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawElements(gl.TRIANGLES,IX.length,gl.UNSIGNED_SHORT,0)}
var OFF={a:0,b:37};
var cvs=[];
function setup(){document.querySelectorAll('.plate .pl').forEach(function(pl){if(pl._sg)return;pl._sg=1;var im=pl.querySelector('img');if(im)im.style.display='none';
var c=document.createElement('canvas');var pg=pl.closest('[data-page]');c.dataset.pal=(pg&&pg.getAttribute('data-page')==='assistant')?'b':'a';c.width=W;c.height=H;c.style.cssText='width:100%;height:100%;display:block';pl.appendChild(c);cvs.push(c)})}
setup();setInterval(setup,1500);
render(OFF.b+11,1);try{document.documentElement.style.setProperty('--aiimg','url('+src.toDataURL('image/jpeg',.85)+')')}catch(e){}
var t0=performance.now(),last=0;
function draw(now){requestAnimationFrame(draw);if(document.hidden)return;if(reduce&&last)return;if(now-last<33)return;last=now;
var vis=cvs.filter(function(c){return c.offsetParent!==null});if(!vis.length)return;
var tt=(now-t0)/1000;vis.forEach(function(c){render(OFF[c.dataset.pal]+(reduce?4:tt),tt);c.getContext('2d').drawImage(src,0,0)})}
requestAnimationFrame(draw);
})();
