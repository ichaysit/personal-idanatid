'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Particles } from './Particles';
import { useSceneState } from './SceneCanvas';

/* מפת תבליט של הרים, מצוירת בקווי גובה כמו מפה טופוגרפית.
   הגבהים מחושבים ב־JS כדי שנוכל להציב את סיכות הנכסים בדיוק על פני השטח. */

const HALF = 9;
const SEG = 180;
const MAX_H = 3.1;

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}
function noise(x: number, y: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(ix, iy);
  const b = hash(ix + 1, iy);
  const c = hash(ix, iy + 1);
  const d = hash(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}
/** גובה פני השטח בנקודה (x, z) ביחידות מפה: ‎-1 עד 1 */
export function terrainHeight(x: number, z: number) {
  let f = 0;
  let amp = 0.5;
  let fr = 1.55;
  for (let i = 0; i < 5; i++) {
    f += amp * noise(x * fr + 3.7, z * fr + 9.2);
    amp *= 0.5;
    fr *= 2.03;
  }
  return Math.pow(f, 1.9) * MAX_H * 1.45;
}

const vertex = /* glsl */ `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uPaper;
  uniform vec3 uInk;
  uniform vec3 uAcc;
  uniform float uReveal;
  uniform float uHalf;
  uniform vec3 uFocus;
  uniform float uTime;
  varying vec3 vPos;

  float iso(float v, float width) {
    float fw = fwidth(v);
    return 1.0 - smoothstep(0.0, fw * width, abs(fract(v - 0.5) - 0.5));
  }

  void main() {
    float h = vPos.y * 7.0;
    float minor = iso(h, 1.1);
    float major = iso(h / 5.0, 1.5);
    float lines = max(minor * 0.5, major * 0.95);

    float rad = length(vPos.xz) / uHalf;
    /* הקווים נמשכים מהמרכז החוצה בטעינה */
    lines *= 1.0 - smoothstep(uReveal * 1.5 - 0.25, uReveal * 1.5, rad);

    vec3 col = mix(uPaper * 0.93, uPaper, smoothstep(0.0, 2.4, vPos.y));
    vec3 ink = uInk;
    /* טבעת צבע סביב הנכס הנבחר */
    float fd = length(vPos.xz - uFocus.xz);
    ink = mix(uAcc, ink, smoothstep(0.5, 1.7, fd));
    col = mix(col, ink, lines);

    /* קו גובה אחד "נסרק" ועולה לאט מהעמק אל הפסגות */
    float sweep = smoothstep(0.1, 0.0, abs(vPos.y - mod(uTime * 0.32, 3.4)));
    col = mix(col, uAcc, sweep * (0.25 + lines * 0.75));

    /* טבעות מכ"ם שמתפשטות מהבית הנבחר */
    float ring = smoothstep(0.09, 0.0, abs(fd - mod(uTime * 1.5, 4.5))) * smoothstep(4.5, 0.8, fd);
    col = mix(col, uAcc, ring * 0.85);

    col = mix(col, uPaper, smoothstep(0.62, 0.98, rad));
    gl_FragColor = vec4(col, 1.0);
  }
`;

export type Pin = { id: string; x: number; z: number; label: string; sub: string };

type Props = {
  pins: Pin[];
  active: string;
  onActive: (id: string) => void;
};

export default function TerrainScene({ pins, active, onActive }: Props) {
  const scene = useSceneState();
  const time = useRef(0);
  const focus = useRef(new THREE.Vector3());
  const land = useRef<THREE.Group>(null);
  const aim = useRef(new THREE.Vector3(0, 0.9, 0));

  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(HALF * 2, HALF * 2, SEG, SEG);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, terrainHeight(pos.getX(i) / HALF, pos.getZ(i) / HALF));
    }
    pos.needsUpdate = true;
    return g;
  }, []);

  const placed = useMemo(
    () => pins.map((p) => ({ ...p, pos: new THREE.Vector3(p.x * HALF, terrainHeight(p.x, p.z), p.z * HALF) })),
    [pins],
  );

  const uniforms = useMemo(
    () => ({
      uPaper: { value: new THREE.Color('#dcd8d0') },
      uInk: { value: new THREE.Color('#191613') },
      uAcc: { value: new THREE.Color('#a12a3c') },
      uReveal: { value: 0 },
      uHalf: { value: HALF },
      uFocus: { value: new THREE.Vector3() },
      uTime: { value: 0 },
    }),
    [],
  );

  const accent = useMemo(() => new THREE.Color('#c8253f').multiplyScalar(3.2), []);
  const v3 = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera, invalidate, size }, delta) => {
    const dt = Math.min(delta, 0.1);
    time.current += dt;
    const t = time.current;
    const s = scene.current;
    uniforms.uReveal.value = Math.min(1, t / 2.8);
    uniforms.uTime.value = t;
    /* ההרים צומחים מהמישור בטעינה */
    if (land.current) {
      const r = Math.min(1, t / 2.4);
      land.current.scale.y = 0.02 + 0.98 * (1 - Math.pow(1 - r, 3));
    }

    const target = placed.find((p) => p.id === active)?.pos;
    if (target) focus.current.lerp(target, 1 - Math.exp(-dt * 4));
    uniforms.uFocus.value.copy(focus.current);

    /* בגלילה המצלמה עולה למבט־על, כמו מעבר מנוף למפה */
    const ang = -0.55 + Math.sin(t * 0.06) * 0.22 + s.px * 0.14;
    const portrait = size.height > size.width;
    const radius = (portrait ? 21 : 13.5) - s.scroll * 7;
    const height = (portrait ? 10.5 : 6.6) + s.scroll * 9 + s.py * 0.5;
    const k = 1 - Math.exp(-dt * 2.4);
    camera.position.x += (Math.sin(ang) * radius - camera.position.x) * k;
    camera.position.z += (Math.cos(ang) * radius - camera.position.z) * k;
    camera.position.y += (height - camera.position.y) * k;
    /* המבט נמשך מעט אל הבית הנבחר, כך שכל בחירה מזיזה את כל הנוף */
    aim.current.lerp(v3.set(focus.current.x * 0.3, portrait ? 3.4 : 0.9, focus.current.z * 0.3), 1 - Math.exp(-dt * 2));
    camera.lookAt(aim.current);
    if (uniforms.uReveal.value < 1) invalidate();
  });

  return (
    <>
      <color attach="background" args={['#dcd8d0']} />
      <group ref={land}>
      <mesh geometry={geometry}>
        <shaderMaterial args={[{ vertexShader: vertex, fragmentShader: fragment, uniforms }]} />
      </mesh>
      <Particles count={140} spread={[18, 5, 18]} color="#191613" size={0.035} glow={1} y={0.4} />

      {placed.map((p) => {
        const on = p.id === active;
        return (
          <group key={p.id} position={p.pos}>
            {/* בית זעיר בשני נפחים, במקום סיכה */}
            <mesh position={[0, 0.11, 0]}>
              <boxGeometry args={[0.52, 0.22, 0.36]} />
              {on ? <meshBasicMaterial color={accent} toneMapped={false} /> : <meshStandardMaterial color="#191613" metalness={0.5} roughness={0.35} />}
            </mesh>
            <mesh position={[0.08, 0.31, -0.02]}>
              <boxGeometry args={[0.32, 0.18, 0.3]} />
              <meshStandardMaterial color={on ? '#f2efe9' : '#3a352f'} metalness={0.3} roughness={0.4} />
            </mesh>
            {/* אלומת אור מעל הבית הנבחר */}
            <mesh position={[0, 1.5, 0]} scale={[1, on ? 1 : 0.28, 1]}>
              <boxGeometry args={[0.022, 2.2, 0.022]} />
              {on ? <meshBasicMaterial color={accent} toneMapped={false} /> : <meshBasicMaterial color="#191613" />}
            </mesh>
            {/* משטח פגיעה גדול ושקוף, כדי שיהיה קל לבחור סיכה */}
            <mesh
              position={[0, 0.9, 0]}
              onPointerOver={(e) => {
                e.stopPropagation();
                onActive(p.id);
              }}
              onClick={(e) => {
                e.stopPropagation();
                onActive(p.id);
              }}
            >
              <boxGeometry args={[1.1, 2.2, 1.1]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>
            {on && (
              <Html position={[0, 2.75, 0]} center zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
                <div
                  dir="rtl"
                  className="hidden md:block"
                  style={{
                    transform: 'translateY(-60%)',
                    whiteSpace: 'nowrap',
                    background: '#191613',
                    color: '#dcd8d0',
                    padding: '6px 12px',
                    fontFamily: 'var(--font-miriam), sans-serif',
                    fontSize: 14,
                    lineHeight: 1.35,
                  }}
                >
                  <strong style={{ display: 'block', fontWeight: 700 }}>{p.label}</strong>
                  <span style={{ opacity: 0.75 }}>{p.sub}</span>
                </div>
              </Html>
            )}
          </group>
        );
      })}
      </group>
    </>
  );
}
