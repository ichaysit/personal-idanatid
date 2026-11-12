'use client';

import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneState } from './SceneCanvas';

/* התצלום של הווילה נפרש על כל המסך, והבריכה שבו הופכת למים חיים:
   גלים, אדווה שיוצאת מהסמן ונצנוצי שמש. בגלילה המים עולים ומכסים את התמונה. */

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform sampler2D uTex;
  uniform float uImg;
  uniform float uView;
  uniform float uTime;
  uniform float uScroll;
  uniform float uPulse;
  uniform float uWaterline;
  uniform vec2 uPointer;
  uniform vec3 uDeep;
  uniform vec3 uSpark;
  varying vec2 vUv;

  vec2 cover(vec2 uv) {
    float r = uView / uImg;
    vec2 s = r > 1.0 ? vec2(1.0, 1.0 / r) : vec2(r, 1.0);
    return (uv - 0.5) * s + 0.5;
  }

  float waves(vec2 p) {
    float t = uTime;
    float h = 0.0;
    h += sin(p.x * 9.0 + t * 0.9) * 0.5;
    h += sin(p.x * 4.0 - p.y * 13.0 + t * 1.3) * 0.35;
    h += sin(p.x * 17.0 + p.y * 7.0 - t * 1.7) * 0.2;
    h += sin((p.x + p.y) * 31.0 + t * 2.3) * 0.08;
    vec2 d = p - vec2(uPointer.x * uView, uPointer.y);
    float dist = length(d);
    h += sin(dist * 46.0 - t * 7.0) * exp(-dist * 5.5) * uPulse * 1.6;
    return h;
  }

  void main() {
    vec2 iuv = cover(vUv);
    float line = mix(uWaterline, 1.35, smoothstep(0.0, 0.85, uScroll));
    float mask = 1.0 - smoothstep(line - 0.14, line + 0.02, iuv.y);

    vec2 p = vec2(vUv.x * uView, vUv.y * (1.0 + (1.0 - vUv.y) * 0.9));
    float e = 0.004;
    float h0 = waves(p);
    vec2 n = vec2(waves(p + vec2(e, 0.0)) - h0, waves(p + vec2(0.0, e)) - h0) / e;

    vec2 uv = iuv + n * 0.0016 * mask;
    vec3 col = texture2D(uTex, uv).rgb;

    /* נצנוץ: רק היכן שהגל פונה אל השמש */
    vec3 nn = normalize(vec3(-n * 0.05, 1.0));
    float spec = pow(max(dot(nn, normalize(vec3(-0.35, 0.5, 0.8))), 0.0), 90.0);
    col += uSpark * spec * mask * 2.2;

    float sink = smoothstep(0.25, 0.95, uScroll);
    col = mix(col, uDeep * (0.75 + 0.25 * nn.y), sink * mask);
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function WaterScene({ src, waterline = 0.42 }: { src: string; waterline?: number }) {
  const tex = useTexture(src);
  const { viewport, size } = useThree();
  const scene = useSceneState();
  const last = useRef({ x: 0, y: 0 });
  const time = useRef(0);

  const uniforms = useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    const image = tex.image as HTMLImageElement;
    return {
      uTex: { value: tex },
      uImg: { value: image.width / image.height },
      uView: { value: 1 },
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPulse: { value: 0.25 },
      uWaterline: { value: waterline },
      uPointer: { value: new THREE.Vector2(0.5, 0.2) },
      uDeep: { value: new THREE.Color('#141c17') },
      uSpark: { value: new THREE.Color('#fff3d6') },
    };
  }, [tex, waterline]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    time.current += dt;
    const s = scene.current;
    uniforms.uTime.value = time.current;
    uniforms.uView.value = size.width / size.height;
    uniforms.uScroll.value += (s.scroll - uniforms.uScroll.value) * (1 - Math.exp(-dt * 6));

    const x = s.px * 0.5 + 0.5;
    const y = s.py * 0.5 + 0.5;
    const speed = Math.hypot(x - last.current.x, y - last.current.y);
    last.current.x = x;
    last.current.y = y;
    const p = uniforms.uPointer.value;
    p.x += (x - p.x) * (1 - Math.exp(-dt * 5));
    p.y += (y - p.y) * (1 - Math.exp(-dt * 5));
    /* האדווה מתחזקת כשהסמן זז ודועכת כשהוא נח */
    uniforms.uPulse.value = Math.min(1, uniforms.uPulse.value * Math.exp(-dt * 0.9) + speed * 6);
    uniforms.uPulse.value = Math.max(0.12, uniforms.uPulse.value);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial args={[{ vertexShader: vertex, fragmentShader: fragment, uniforms }]} />
    </mesh>
  );
}
