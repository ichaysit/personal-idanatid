'use client';

import { createContext, useContext, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Particles } from './Particles';
import { useSceneState } from './SceneCanvas';

/* בית תלת־ממדי שאפשר להיכנס אליו. הגלילה מזיזה את המצלמה לאורך מסלול:
   מבט מבחוץ, כניסה בדלת, סלון ומטבח, עלייה בחלל הכפול אל הגלריה, ויציאה אל המרפסת.
   הכול בנוי מקוביות עם קווי מתאר זוהרים, כמו הדמיה אדריכלית הולוגרפית. */

export type HouseTheme = {
  bg: string;
  wall: string;
  floor: string;
  furniture: string;
  accent: string;
  /** tower: הבית יושב בראש מגדל, כמו פנטהאוז */
  podium: 'ground' | 'tower';
  water: boolean;
};

const Theme = createContext<{ theme: HouseTheme; edge: THREE.Color; glow: THREE.Color }>(null!);

type V3 = [number, number, number];

function Block({
  pos,
  size,
  color,
  opacity = 1,
  edges = true,
  glow = false,
}: {
  pos: V3;
  size: V3;
  color?: string;
  opacity?: number;
  edges?: boolean;
  glow?: boolean;
}) {
  const t = useContext(Theme);
  const geo = useMemo(() => new THREE.BoxGeometry(size[0], size[1], size[2]), [size[0], size[1], size[2]]);
  const line = useMemo(() => new THREE.EdgesGeometry(geo), [geo]);
  return (
    <group position={pos}>
      <mesh geometry={geo}>
        {glow ? (
          <meshBasicMaterial color={t.glow} toneMapped={false} />
        ) : (
          <meshStandardMaterial
            color={color ?? t.theme.wall}
            roughness={0.75}
            metalness={0.05}
            transparent={opacity < 1}
            opacity={opacity}
            depthWrite={opacity >= 1}
          />
        )}
      </mesh>
      {edges && !glow && (
        <lineSegments geometry={line}>
          <lineBasicMaterial color={t.edge} toneMapped={false} transparent opacity={0.9} />
        </lineSegments>
      )}
    </group>
  );
}

const gridVertex = /* glsl */ `
  varying vec3 vW;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vW = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;
const gridFragment = /* glsl */ `
  uniform vec3 uBg;
  uniform vec3 uLine;
  uniform float uTime;
  varying vec3 vW;
  float grid(vec2 p, float w) {
    vec2 g = abs(fract(p - 0.5) - 0.5) / fwidth(p);
    return 1.0 - min(min(g.x, g.y) / w, 1.0);
  }
  void main() {
    float d = length(vW.xz);
    float g = max(grid(vW.xz * 0.5, 1.2) * 0.55, grid(vW.xz * 0.1, 1.6));
    /* גל אור שמתפשט מהבית החוצה */
    float wave = smoothstep(2.5, 0.0, abs(d - mod(uTime * 6.0, 70.0)));
    vec3 col = mix(uBg, uLine * (0.9 + wave * 2.5), g * smoothstep(60.0, 6.0, d));
    gl_FragColor = vec4(col, 1.0);
  }
`;

/* מסלול המצלמה ונקודות המבט, לפי סדר הסיור */
const PATH: V3[] = [
  [15, 7.5, 17],
  [-10, 3.2, 13],
  [0, 1.7, 9],
  [0, 1.6, 2.1],
  [-3.4, 1.65, 2.4],
  [1.6, 4.6, 1.6],
  [2.2, 4.6, -1.4],
  [0, 4.7, 2.3],
  [0, 9.5, 19],
];
const LOOK: V3[] = [
  [0, 2.6, 0],
  [0, 2.6, 0],
  [0, 1.8, 0],
  [-2.2, 1.3, -0.4],
  [2.6, 1.6, -2.2],
  [0, 3.7, -2.4],
  [-3, 3.7, -2.4],
  [-0.6, 0.4, 7],
  [0, 2.2, 0],
];

function House() {
  const { theme } = useContext(Theme);
  const W = theme.wall;
  const F = theme.floor;
  const U = theme.furniture;
  return (
    <group>
      {/* רצפה, קירות, תקרה */}
      <Block pos={[0, -0.1, 0]} size={[10.4, 0.2, 7.4]} color={F} />
      <Block pos={[0, 3, -3.6]} size={[10.4, 6.2, 0.2]} color={W} />
      <Block pos={[-5.1, 3, 0]} size={[0.2, 6.2, 7.4]} color={W} />
      <Block pos={[5.1, 3, 0]} size={[0.2, 6.2, 7.4]} color={W} />
      <Block pos={[0, 6.15, 0.8]} size={[11.2, 0.3, 9.4]} color={W} />
      {/* חזית זכוכית עם פתח לדלת באמצע */}
      <Block pos={[-2.95, 3, 3.6]} size={[4.5, 6, 0.08]} color="#bfe6ee" opacity={0.14} />
      <Block pos={[2.95, 3, 3.6]} size={[4.5, 6, 0.08]} color="#bfe6ee" opacity={0.14} />
      <Block pos={[0, 4.3, 3.6]} size={[1.4, 3.4, 0.08]} color="#bfe6ee" opacity={0.14} />
      <Block pos={[0, 2.65, 3.6]} size={[1.5, 0.1, 0.3]} glow />
      {/* קומת הגלריה: מכסה רק את החצי האחורי, מלפנים חלל בגובה כפול */}
      <Block pos={[0, 3, -2]} size={[10, 0.2, 3]} color={F} />
      {[-4, -2, 0, 2, 4].map((x) => (
        <Block key={x} pos={[x, 3.6, -0.55]} size={[0.06, 1, 0.06]} color={U} edges={false} />
      ))}
      <Block pos={[0, 4.1, -0.55]} size={[10, 0.06, 0.06]} glow />

      {/* סלון */}
      <Block pos={[-2.6, 0.02, 1]} size={[3.8, 0.04, 2.8]} color={U} edges={false} opacity={0.5} />
      <Block pos={[-3.3, 0.4, 0.2]} size={[2.6, 0.8, 0.95]} color={U} />
      <Block pos={[-4.25, 0.4, 1.4]} size={[0.95, 0.8, 1.5]} color={U} />
      <Block pos={[-2.5, 0.25, 1.5]} size={[1.3, 0.5, 0.8]} color={W} />
      <Block pos={[-2.5, 0.52, 1.5]} size={[0.5, 0.04, 0.3]} glow />
      {/* מטבח: אי, משטח לאורך הקיר ושלוש מנורות תלויות */}
      <Block pos={[2.6, 0.48, -1.3]} size={[2.8, 0.95, 1]} color={W} />
      <Block pos={[2.6, 0.5, -3.1]} size={[4.4, 1, 0.7]} color={U} />
      {[1.7, 2.6, 3.5].map((x) => (
        <group key={x}>
          <Block pos={[x, 2.45, -1.3]} size={[0.02, 0.9, 0.02]} color={U} edges={false} />
          <Block pos={[x, 1.95, -1.3]} size={[0.22, 0.16, 0.22]} glow />
        </group>
      ))}
      {/* ארונות עליונים, פס תאורה מתחתיהם ומדפים */}
      <Block pos={[2.6, 2.1, -3.25]} size={[4.4, 0.7, 0.4]} color={W} />
      <Block pos={[2.6, 1.72, -3.2]} size={[4.2, 0.03, 0.05]} glow />
      {/* תמונה גדולה על הקיר שליד הספה, עם מסגרת אור */}
      <Block pos={[-4.96, 1.9, 0.6]} size={[0.06, 1.7, 2.6]} color={U} />
      <Block pos={[-4.93, 2.78, 0.6]} size={[0.03, 0.03, 2.7]} glow />
      <Block pos={[-4.93, 1.02, 0.6]} size={[0.03, 0.03, 2.7]} glow />
      {/* פסי תאורה בתקרה */}
      <Block pos={[-2.2, 5.97, 1.4]} size={[0.06, 0.03, 4]} glow />
      <Block pos={[2.2, 5.97, 1.4]} size={[0.06, 0.03, 4]} glow />
      {/* חלון רצועה בקיר האחורי של הגלריה */}
      <Block pos={[0, 5, -3.48]} size={[8.4, 0.9, 0.05]} color="#bfe6ee" opacity={0.3} />
      <Block pos={[0, 4.52, -3.46]} size={[8.4, 0.03, 0.04]} glow />
      {/* שולחן אוכל ושישה כיסאות */}
      <Block pos={[0.6, 0.72, 1.6]} size={[2.2, 0.08, 0.95]} color={W} />
      <Block pos={[0.6, 0.36, 1.6]} size={[0.14, 0.7, 0.14]} color={U} edges={false} />
      {[-0.2, 0.6, 1.4].flatMap((x) => [0.85, 2.35].map((z) => <Block key={`${x}-${z}`} pos={[x, 0.24, z]} size={[0.42, 0.46, 0.42]} color={U} />))}

      {/* מדרגות לאורך הקיר הימני */}
      {Array.from({ length: 10 }, (_, i) => (
        <Block key={i} pos={[4.3, 0.15 + i * 0.3, 2.6 - i * 0.42]} size={[1.3, 0.08, 0.4]} color={U} />
      ))}
      {/* חדר שינה בגלריה */}
      <Block pos={[-2.9, 3.4, -2.2]} size={[2.2, 0.5, 2.3]} color={U} />
      <Block pos={[-2.9, 3.95, -3.3]} size={[2.4, 1.2, 0.14]} color={W} />
      <Block pos={[-1.4, 3.35, -3]} size={[0.5, 0.5, 0.5]} color={W} />
      <Block pos={[-1.4, 3.72, -3]} size={[0.16, 0.2, 0.16]} glow />
      <Block pos={[2.4, 3.6, -3.1]} size={[2.6, 1, 0.5]} color={U} />

      {/* מרפסת ובריכה */}
      <Block pos={[0, -0.05, 6.1]} size={[10.4, 0.1, 5]} color={F} />
      {theme.water && (
        <>
          <Block pos={[-1.2, 0.02, 6.4]} size={[6.4, 0.06, 2.6]} color="#3fb7ad" opacity={0.75} />
          <Block pos={[-1.2, 0.07, 5.1]} size={[6.4, 0.02, 0.04]} glow />
          <Block pos={[-1.2, 0.07, 7.7]} size={[6.4, 0.02, 0.04]} glow />
        </>
      )}
      <Block pos={[3.6, 0.2, 6.8]} size={[1.7, 0.3, 0.7]} color={W} />
      <Block pos={[3.6, 0.2, 5.6]} size={[1.7, 0.3, 0.7]} color={W} />
    </group>
  );
}

export default function HouseScene({ theme }: { theme: HouseTheme }) {
  const scene = useSceneState();
  const smooth = useRef(0);
  const time = useRef(0);
  const scan = useRef<THREE.Group>(null);
  const look = useRef(new THREE.Vector3(0, 2.6, 0));

  const ctx = useMemo(
    () => ({
      theme,
      edge: new THREE.Color(theme.accent).multiplyScalar(1.5),
      glow: new THREE.Color(theme.accent).multiplyScalar(3.4),
    }),
    [theme],
  );
  const curves = useMemo(
    () => ({
      pos: new THREE.CatmullRomCurve3(PATH.map((p) => new THREE.Vector3(...p)), false, 'centripetal'),
      look: new THREE.CatmullRomCurve3(LOOK.map((p) => new THREE.Vector3(...p)), false, 'centripetal'),
    }),
    [],
  );
  const grid = useMemo(
    () => ({
      uBg: { value: new THREE.Color(theme.bg) },
      uLine: { value: new THREE.Color(theme.accent) },
      uTime: { value: 0 },
    }),
    [theme],
  );
  const v = useMemo(() => new THREE.Vector3(), []);
  const baseY = theme.podium === 'tower' ? 34 : 0;
  /* על רקע בהיר מנורות חזקות צובעות את כל הקירות, אז מחלישים אותן */
  const lamp = new THREE.Color(theme.bg).getHSL({ h: 0, s: 0, l: 0 }).l > 0.5 ? 0.22 : 1;

  useFrame(({ camera, size }, delta) => {
    const dt = Math.min(delta, 0.1);
    time.current += dt;
    grid.uTime.value = time.current;
    const s = scene.current;
    /* קפיצה גדולה (טעינה באמצע הסיור, קישור מהתפריט) מדלגת ישר למקום במקום לטוס דרך הקירות */
    if (Math.abs(s.scroll - smooth.current) > 0.22) smooth.current = s.scroll;
    smooth.current += (s.scroll - smooth.current) * (1 - Math.exp(-dt * 3.2));
    const p = Math.min(0.999, Math.max(0, smooth.current));

    curves.pos.getPoint(p, v);
    /* במסך לאורך המבט מבחוץ צריך מרחק גדול יותר כדי שהבית כולו ייכנס */
    const wide = size.height > size.width ? 1 + 0.55 * Math.max(0, 1 - p * 5) + 0.5 * Math.max(0, (p - 0.9) * 10) : 1;
    camera.position.set(v.x * wide + s.px * 0.25, baseY + v.y * (wide > 1 ? 1 + (wide - 1) * 0.5 : 1) + s.py * 0.12, v.z * wide);
    curves.look.getPoint(p, v);
    look.current.set(v.x, baseY + v.y, v.z);
    camera.lookAt(look.current);

    /* משטח הסריקה עולה ויורד על הבית כל עוד מסתכלים מבחוץ */
    if (scan.current) {
      const outside = Math.max(0, 1 - p * 4.5);
      scan.current.visible = outside > 0.02;
      scan.current.position.y = 3.1 + Math.sin(time.current * 0.9) * 3.1;
      scan.current.scale.setScalar(0.6 + outside * 0.4);
    }
  });

  return (
    <Theme.Provider value={ctx}>
      <color attach="background" args={[theme.bg]} />
      <fog attach="fog" args={[theme.bg, 26, 85]} />
      <directionalLight position={[8, 14, 10]} intensity={1.6} />
      <pointLight position={[2.6, 2.4 + baseY, -1.3]} intensity={14 * lamp} color={theme.accent} distance={9} />
      <pointLight position={[-3, 5 + baseY, -2]} intensity={10 * lamp} color={theme.accent} distance={8} />

      <group position={[0, baseY, 0]}>
        <House />
        <group ref={scan}>
          <mesh>
            <boxGeometry args={[12.4, 0.03, 9.6]} />
            <meshBasicMaterial color={ctx.glow} toneMapped={false} transparent opacity={0.28} depthWrite={false} />
          </mesh>
        </group>
        <Particles count={160} spread={[26, 12, 26]} color={theme.accent} size={0.05} glow={2.4} y={0} />
      </group>

      {theme.podium === 'tower' && (
        <>
          <Block pos={[0, baseY / 2 - 0.2, 0]} size={[10.4, baseY, 7.4]} color={theme.wall} />
          {[[-22, 20, -14, 9], [19, 26, -20, 8], [26, 14, 9, 10], [-28, 30, 12, 9], [-9, 16, -32, 11], [12, 22, 30, 9]].map(([x, h, z, w], i) => (
            <Block key={i} pos={[x, h / 2, z]} size={[w, h, w]} color={theme.wall} />
          ))}
        </>
      )}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.25, 0]}>
        <planeGeometry args={[400, 400]} />
        <shaderMaterial args={[{ vertexShader: gridVertex, fragmentShader: gridFragment, uniforms: grid }]} />
      </mesh>
    </Theme.Provider>
  );
}
