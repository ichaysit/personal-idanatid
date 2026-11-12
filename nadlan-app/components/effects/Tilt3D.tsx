'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

/* כל אזור נכנס למסך כשהוא מוטה לאחור במרחב ומתיישר תוך כדי גלילה. */
export function Tilt3D({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 40%'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.3, 1]);
  if (reduce) return <div>{children}</div>;
  return (
    <div ref={ref} style={{ perspective: 1400 }}>
      <motion.div style={{ rotateX, scale, opacity, transformOrigin: '50% 0%' }}>{children}</motion.div>
    </div>
  );
}
