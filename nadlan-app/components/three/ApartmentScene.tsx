'use client';

import { useContext, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Block, Theme, type HouseTheme } from './HouseScene';
import { useSceneState } from './SceneCanvas';

/* דירה אמיתית מתצלומים. כל חדר הוא קופסה תלת־ממדית שהתצלום שלו מוקרן על פנים הקירות,
   הרצפה והתקרה (מרכז התצלום על הקיר הרחוק, השוליים על הצדדים), כך שכשהמצלמה זזה
   מקבלים עומק ופרספקטיבה של חדר ולא של תמונה שטוחה. המצלמה הולכת במסדרון ונכנסת לכל חדר. */

const HALL = 1.3; // חצי רוחב המסדרון
const H = 3.2; // גובה תקרה
const W = 5.6; // רוחב חדר לאורך המסדרון
const D = 5.2; // עומק חדר
const STEP = 6.6; // מרחק בין חדר לחדר
const FIRST = -4;

const vertex = /* glsl */ `
  attribute vec3 uvq;
  varying vec3 vUvq;
  varying float vDepth;
  void main() {
    vUvq = uvq;
    vDepth = -position.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const fragment = /* glsl */ `
  uniform sampler2D uTex;
  varying vec3 vUvq;
  varying float vDepth;
  void main() {
    /* חלוקה ב־q נותנת מיפוי פרספקטיבי נכון של הטרפז שבתצלום על מלבן במרחב */
    vec3 col = texture2D(uTex, vUvq.xy / vUvq.z).rgb;
    gl_FragColor = vec4(col, 1.0);
  }
`;

/** קופסת חדר פתוחה מלפנים, עם קואורדינטות תצלום פרספקטיביות */
function roomGeometry(aspect: number) {
  const a = aspect < 1 ? 0.08 : 0.26;
  const b = (1 - ((1 - 2 * a) * aspect) / (W / H)) / 2;
  const qx = 1 / (1 - 2 * a);
  const qy = 1 / (1 - 2 * b);
  const x0 = -W / 2, x1 = W / 2;
  const pos: number[] = [];
  const uvq: number[] = [];
  const quad = (p: number[][], t: number[][]) => {
    for (const i of [0, 1, 2, 0, 2, 3]) {
      pos.push(...p[i]);
      uvq.push(t[i][0] * t[i][2], t[i][1] * t[i][2], t[i][2]);
    }
  };
  // קיר רחוק
  quad([[x0, 0, -D], [x1, 0, -D], [x1, H, -D], [x0, H, -D]], [[a, b, 1], [1 - a, b, 1], [1 - a, 1 - b, 1], [a, 1 - b, 1]]);
  // רצפה
  quad([[x0, 0, 0], [x1, 0, 0], [x1, 0, -D], [x0, 0, -D]], [[0, 0, 1], [1, 0, 1], [1 - a, b, qx], [a, b, qx]]);
  // תקרה
  quad([[x0, H, -D], [x1, H, -D], [x1, H, 0], [x0, H, 0]], [[a, 1 - b, qx], [1 - a, 1 - b, qx], [1, 1, 1], [0, 1, 1]]);
  // קיר שמאלי
  quad([[x0, 0, 0], [x0, 0, -D], [x0, H, -D], [x0, H, 0]], [[0, 0, 1], [a, b, qy], [a, 1 - b, qy], [0, 1, 1]]);
  // קיר ימני
  quad([[x1, 0, -D], [x1, 0, 0], [x1, H, 0], [x1, H, -D]], [[1 - a, b, qy], [1, 0, 1], [1, 1, 1], [1 - a, 1 - b, qy]]);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uvq', new THREE.Float32BufferAttribute(uvq, 3));
  return g;
}

function Room({ tex, z, side }: { tex: THREE.Texture; z: number; side: 1 | -1 }) {
  const { geometry, uniforms } = useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    const image = tex.image as HTMLImageElement;
    return { geometry: roomGeometry(image.width / image.height), uniforms: { uTex: { value: tex } } };
  }, [tex]);
  return (
    <group position={[side * HALL, 0, z]} rotation={[0, side === 1 ? -Math.PI / 2 : Math.PI / 2, 0]}>
      <mesh geometry={geometry}>
        <shaderMaterial args={[{ vertexShader: vertex, fragmentShader: fragment, uniforms, side: THREE.DoubleSide }]} />
      </mesh>
    </group>
  );
}

export default function ApartmentScene({ theme, photos }: { theme: HouseTheme; photos: string[] }) {
  const textures = useTexture(photos);
  const scene = useSceneState();
  const smooth = useRef(0);
  const time = useRef(0);
  const n = photos.length;

  const ctx = useMemo(
    () => ({
      theme,
      edge: new THREE.Color(theme.accent).multiplyScalar(1.5),
      glow: new THREE.Color(theme.accent).multiplyScalar(3.4),
    }),
    [theme],
  );

  const rooms = useMemo(
    () => Array.from({ length: n }, (_, i) => ({ z: FIRST - i * STEP, side: (i % 2 === 0 ? 1 : -1) as 1 | -1 })),
    [n],
  );
  const end = FIRST - (n - 1) * STEP - W / 2 - 1.2;

  /* מסלול: מהכניסה לאורך המסדרון, ולכל חדר: עצירה מול הפתח, כניסה פנימה, חזרה למסדרון */
  const curves = useMemo(() => {
    const pos: THREE.Vector3[] = [new THREE.Vector3(0, 1.6, 5.5)];
    const look: THREE.Vector3[] = [new THREE.Vector3(0, 1.5, -12)];
    rooms.forEach((r, i) => {
      const back = new THREE.Vector3(r.side * (HALL + D), 1.55, r.z);
      const next = rooms[i + 1];
      pos.push(new THREE.Vector3(-r.side * 0.5, 1.6, r.z + 0.9));
      look.push(back);
      pos.push(new THREE.Vector3(r.side * (HALL + 1.5), 1.6, r.z));
      look.push(back);
      pos.push(new THREE.Vector3(0, 1.6, r.z - 1.6));
      look.push(next ? new THREE.Vector3(next.side * (HALL + D), 1.55, next.z) : new THREE.Vector3(0, 1.5, end));
    });
    return {
      pos: new THREE.CatmullRomCurve3(pos, false, 'centripetal'),
      look: new THREE.CatmullRomCurve3(look, false, 'centripetal'),
    };
  }, [rooms, end]);

  const v = useMemo(() => new THREE.Vector3(), []);
  const l = useMemo(() => new THREE.Vector3(), []);
  const side = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera }, delta) => {
    const dt = Math.min(delta, 0.1);
    time.current += dt;
    const s = scene.current;
    if (Math.abs(s.scroll - smooth.current) > 0.22) smooth.current = s.scroll;
    smooth.current += (s.scroll - smooth.current) * (1 - Math.exp(-dt * 3.2));
    const p = Math.min(0.999, Math.max(0, smooth.current));
    curves.pos.getPoint(p, v);
    curves.look.getPoint(p, l);
    /* תנודה קלה לצדדים (וגם לפי הסמן או המגע): היא שחושפת את העומק של החדר */
    side.subVectors(l, v).cross(camera.up).normalize();
    const sway = Math.sin(time.current * 0.55) * 0.22 + s.px * 0.35;
    camera.position.copy(v).addScaledVector(side, sway);
    camera.position.y += Math.sin(time.current * 0.4) * 0.04 + s.py * 0.12;
    camera.lookAt(l);
  });

  /* קירות המסדרון: בכל צד, מה שנשאר בין פתחי החדרים */
  const walls = useMemo(() => {
    const out: { x: number; z: number; len: number }[] = [];
    for (const sd of [1, -1] as const) {
      let from = 2.2;
      for (const r of rooms.filter((q) => q.side === sd)) {
        const a = r.z + W / 2;
        if (from > a) out.push({ x: sd * (HALL + 0.1), z: (from + a) / 2, len: from - a });
        from = r.z - W / 2;
      }
      if (from > end) out.push({ x: sd * (HALL + 0.1), z: (from + end) / 2, len: from - end });
    }
    return out;
  }, [rooms, end]);

  const len = 2.2 - end;
  const mid = (2.2 + end) / 2;

  return (
    <Theme.Provider value={ctx}>
      <color attach="background" args={[theme.bg]} />
      <directionalLight position={[2, 6, 4]} intensity={1.2} />
      {rooms.map((r, i) => (
        <pointLight key={i} position={[0, 2.6, r.z]} intensity={6} color={theme.accent} distance={7} />
      ))}

      {rooms.map((r, i) => (
        <group key={i}>
          <Room tex={textures[i]} z={r.z} side={r.side} />
          {/* מסגרת אור סביב פתח החדר */}
          <Block pos={[r.side * (HALL + 0.02), H - 0.02, r.z]} size={[0.05, 0.04, W]} glow />
          <Block pos={[r.side * (HALL + 0.02), 0.02, r.z]} size={[0.05, 0.03, W]} glow />
        </group>
      ))}

      {/* רצפה, תקרה, קירות וקיר קצה של המסדרון */}
      <Block pos={[0, -0.05, mid]} size={[HALL * 2, 0.1, len]} color={theme.floor} edges={false} />
      <Block pos={[0, H + 0.05, mid]} size={[HALL * 2, 0.1, len]} color={theme.wall} edges={false} />
      <Block pos={[0, H - 0.01, mid]} size={[0.07, 0.03, len - 1]} glow />
      {walls.map((w, i) => (
        <Block key={i} pos={[w.x, H / 2, w.z]} size={[0.2, H, w.len]} color={theme.wall} />
      ))}
      <Block pos={[0, H / 2, end - 0.1]} size={[HALL * 2 + 0.4, H, 0.2]} color={theme.wall} />
      {/* משקוף הכניסה לדירה */}
      <Block pos={[0, H + 0.3, 2.2]} size={[HALL * 2 + 0.6, 0.5, 0.25]} color={theme.wall} />
      <Block pos={[0, H - 0.03, 2.3]} size={[HALL * 2, 0.04, 0.05]} glow />
    </Theme.Provider>
  );
}
