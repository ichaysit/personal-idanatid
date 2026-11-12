'use client';

import { useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Particles } from './Particles';
import { useSceneState } from './SceneCanvas';

/* עיר של מגדלים שצומחת מהקרקע בטעינה.
   כל מגדל הוא מופע אחד ב־InstancedMesh; החלונות המוארים מחושבים בשיידר. */

const SIDE = 30;
const GAP = 1.18;

const vertex = /* glsl */ `
  attribute float aSeed;
  attribute float aDelay;
  uniform float uGrow;
  varying vec3 vLocal;
  varying vec3 vScale;
  varying vec3 vN;
  varying vec3 vWorld;
  varying float vSeed;

  void main() {
    float g = clamp(uGrow * 2.3 - aDelay * 1.3, 0.0, 1.0);
    g = 1.0 - pow(1.0 - g, 3.0);
    vec3 p = position;
    p.y = (p.y + 0.5) * g;
    vec3 sc = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
    vLocal = p * sc;
    vScale = sc;
    vN = normal;
    vSeed = aSeed;
    vec4 wp = modelMatrix * instanceMatrix * vec4(p, 1.0);
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const fragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uBase;
  uniform vec3 uWarm;
  uniform vec3 uRose;
  uniform vec3 uFog;
  varying vec3 vLocal;
  varying vec3 vScale;
  varying vec3 vN;
  varying vec3 vWorld;
  varying float vSeed;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    float side = 1.0 - abs(vN.y);
    float alongX = step(0.5, abs(vN.x));
    float u = mix(vLocal.x, vLocal.z, alongX);
    vec2 grid = vec2(u * 5.0, vLocal.y * 3.2);
    vec2 cell = floor(grid);
    vec2 f = fract(grid);
    float win = step(0.2, f.x) * step(f.x, 0.8) * step(0.28, f.y) * step(f.y, 0.78);

    float r = hash(cell + vSeed * 91.7 + alongX * 13.0);
    /* כמה חלונות נדלקים ונכבים לאורך הזמן */
    float blink = step(0.93, hash(cell + vSeed)) * step(0.5, fract(uTime * 0.07 + r * 9.0));
    float lit = clamp(step(0.6, r) - blink, 0.0, 1.0);

    float h = vLocal.y / max(vScale.y, 0.001);
    vec3 col = uBase + vec3(0.035, 0.02, 0.045) * h;
    vec3 glow = mix(uWarm, uRose, hash(cell.yx + vSeed * 3.1));
    col = mix(col, glow * 2.4, win * lit * side);
    col = mix(col, uBase * 2.2, win * (1.0 - lit) * side * 0.5);

    /* קו אור בראש המגדלים הגבוהים */
    float crown = smoothstep(0.985, 1.0, h) * side * step(4.2, vScale.y);
    col += uWarm * 3.0 * crown;

    float d = length(vWorld.xz - cameraPosition.xz);
    col = mix(col, uFog, smoothstep(9.0, 30.0, d));
    gl_FragColor = vec4(col, 1.0);
  }
`;

const skyFragment = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uHorizon;
  uniform vec3 uGlow;
  uniform vec3 uSun;
  varying vec3 vDir;
  void main() {
    vec3 d = normalize(vDir);
    /* בקו האופק השמיים שווים לצבע הערפל, כך שקצה הקרקע נעלם */
    vec3 col = mix(uHorizon, uGlow, smoothstep(0.0, 0.16, d.y));
    col = mix(col, uTop, smoothstep(0.1, 0.5, d.y));
    float sun = pow(max(dot(d, normalize(vec3(-0.75, 0.1, -0.65))), 0.0), 6.0);
    col += uSun * sun * 0.42 * smoothstep(0.0, 0.12, d.y);
    gl_FragColor = vec4(col, 1.0);
  }
`;

const skyVertex = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function mulberry(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FOG = '#3b2230';

export default function CityScene() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const scene = useSceneState();
  const time = useRef(0);

  const towers = useMemo(() => {
    const rnd = mulberry(20);
    const list: { x: number; z: number; w: number; d: number; h: number; seed: number; delay: number }[] = [];
    const half = (SIDE - 1) / 2;
    for (let gx = 0; gx < SIDE; gx++) {
      for (let gz = 0; gz < SIDE; gz++) {
        /* שדרות: כל שורה שישית נשארת ריקה */
        if (gx % 6 === 3 || gz % 6 === 3) continue;
        if (rnd() < 0.12) continue;
        const x = (gx - half) * GAP;
        const z = (gz - half) * GAP;
        const dist = Math.min(1, Math.hypot(x, z) / (half * GAP));
        const core = Math.pow(1 - dist, 1.7);
        const h = 0.35 + rnd() * 0.9 + core * (2.5 + rnd() * 5.5) * (rnd() < 0.75 ? 1 : 0.35);
        list.push({ x, z, w: 0.55 + rnd() * 0.4, d: 0.55 + rnd() * 0.4, h, seed: rnd(), delay: dist });
      }
    }
    return list;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uGrow: { value: 0 },
      uBase: { value: new THREE.Color('#1d1524') },
      uWarm: { value: new THREE.Color('#f0a05c') },
      uRose: { value: new THREE.Color('#e9d2b4') },
      uFog: { value: new THREE.Color(FOG) },
    }),
    [],
  );

  const sky = useMemo(
    () => ({
      uTop: { value: new THREE.Color('#17111c') },
      uHorizon: { value: new THREE.Color(FOG) },
      uGlow: { value: new THREE.Color('#7a3a45') },
      uSun: { value: new THREE.Color('#ff9a52') },
    }),
    [],
  );

  useLayoutEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const o = new THREE.Object3D();
    const seeds = new Float32Array(towers.length);
    const delays = new Float32Array(towers.length);
    towers.forEach((t, i) => {
      o.position.set(t.x, 0, t.z);
      o.scale.set(t.w, t.h, t.d);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
      seeds[i] = t.seed;
      delays[i] = t.delay;
    });
    m.geometry.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 1));
    m.geometry.setAttribute('aDelay', new THREE.InstancedBufferAttribute(delays, 1));
    m.instanceMatrix.needsUpdate = true;
  }, [towers]);

  useFrame(({ camera, invalidate }, delta) => {
    /* שעון משלנו: מצטבר מה־delta ולא תלוי בשעון של three */
    const dt = Math.min(delta, 0.1);
    time.current += dt;
    const t = time.current;
    const s = scene.current;
    uniforms.uTime.value = t;
    uniforms.uGrow.value = Math.min(1, t / 3.4);

    const ang = 0.62 + t * 0.022 + s.px * 0.16;
    const radius = 17 - s.scroll * 5;
    const height = 6.4 + s.py * 0.7 - s.scroll * 3.2;
    const k = 1 - Math.exp(-dt * 2.2);
    camera.position.x += (Math.sin(ang) * radius - camera.position.x) * k;
    camera.position.z += (Math.cos(ang) * radius - camera.position.z) * k;
    camera.position.y += (height - camera.position.y) * k;
    camera.lookAt(0, 2.4 + s.scroll * 1.6, 0);
    if (uniforms.uGrow.value < 1) invalidate();
  });

  return (
    <>
      <color attach="background" args={['#17111c']} />
      <fog attach="fog" args={[FOG, 9, 30]} />

      <mesh scale={280}>
        <sphereGeometry args={[1, 32, 16]} />
        <shaderMaterial vertexShader={skyVertex} fragmentShader={skyFragment} uniforms={sky} side={THREE.BackSide} depthWrite={false} fog={false} />
      </mesh>

      <instancedMesh ref={mesh} args={[undefined, undefined, towers.length]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <shaderMaterial args={[{ vertexShader: vertex, fragmentShader: fragment, uniforms }]} />
      </instancedMesh>

      {/* קרקע מבריקה שמחזירה את תאורת הסביבה */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[600, 600]} />
        <meshStandardMaterial color="#120c17" roughness={0.32} metalness={0.85} />
      </mesh>

      <Particles count={260} spread={[34, 11, 34]} color="#ffb072" size={0.055} glow={2.6} y={0.5} />
    </>
  );
}
