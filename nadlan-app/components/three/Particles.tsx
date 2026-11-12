'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Props = {
  count?: number;
  /** רוחב, גובה ועומק של הנפח שבו החלקיקים מרחפים */
  spread?: [number, number, number];
  color?: string;
  size?: number;
  /** מכפיל בהירות. מעל 1 החלקיקים נכנסים לאפקט ה־Bloom. */
  glow?: number;
  y?: number;
};

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

export function Particles({ count = 300, spread = [20, 8, 20], color = '#ffffff', size = 0.05, glow = 2, y = 0 }: Props) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const rnd = mulberry(7);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rnd() - 0.5) * spread[0];
      arr[i * 3 + 1] = rnd() * spread[1];
      arr[i * 3 + 2] = (rnd() - 0.5) * spread[2];
    }
    return arr;
  }, [count, spread]);

  const col = useMemo(() => new THREE.Color(color).multiplyScalar(glow), [color, glow]);

  useFrame((_, dt) => {
    const p = ref.current;
    if (!p) return;
    p.rotation.y += dt * 0.012;
    const a = p.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let v = a.getY(i) + dt * (0.05 + (i % 7) * 0.012);
      if (v > spread[1]) v = 0;
      a.setY(i, v);
    }
    a.needsUpdate = true;
  });

  return (
    <points ref={ref} position={[0, y, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={col} size={size} sizeAttenuation transparent opacity={0.9} depthWrite={false} toneMapped={false} />
    </points>
  );
}
