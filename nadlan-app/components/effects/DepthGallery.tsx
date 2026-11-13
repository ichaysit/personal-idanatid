'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { img } from '@/lib/utils';

/* מנהרת עומק: התמונות תלויות במרחב, והגלילה מטיסה את המצלמה ביניהן. */

type Shot = { image: string; caption: string };
const SPOTS = [
  [-1, -0.5], [1, 0.35], [-0.7, 0.6], [0.9, -0.6], [-1, 0.1], [0.6, 0.55], [0, -0.2],
];
const STEP = 900;

function Frame({ shot, i, n, p }: { shot: Shot; i: number; n: number; p: MotionValue<number> }) {
  const z = useTransform(p, [0, 1], [-i * STEP, (n - i) * STEP - 300]);
  const opacity = useTransform(z, [-STEP * 3.2, -STEP * 1.6, 120, 520], [0, 1, 1, 0]);
  const [sx, sy] = SPOTS[i % SPOTS.length];
  return (
    <motion.figure
      className="absolute left-1/2 top-1/2 m-0 w-[min(64vw,520px)]"
      style={{
        z,
        opacity,
        x: `calc(-50% + ${sx} * var(--spread))`,
        y: `calc(-50% + ${sy} * var(--spread) * 0.55)`,
      }}
    >
      <img src={img(shot.image)} alt="" className="aspect-[4/5] w-full object-cover" />
      <figcaption className="mt-3 font-display text-2xl leading-none">{shot.caption}</figcaption>
    </motion.figure>
  );
}

export function DepthGallery({ shots, title }: { shots: Shot[]; title: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const fade = useTransform(scrollYProgress, [0, 0.12, 0.85, 1], [1, 0.16, 0.16, 0.5]);

  if (reduce) {
    return (
      <section className="grid grid-cols-2 gap-4 px-5 py-24 md:grid-cols-3">
        {shots.map((s) => (
          <img key={s.image} src={img(s.image)} alt={s.caption} className="aspect-[4/5] w-full object-cover" />
        ))}
      </section>
    );
  }

  return (
    <section ref={ref} data-fx="depth" className="relative" style={{ height: `${shots.length * 55 + 70}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden [--spread:17vw] [perspective:1100px] md:[--spread:24vw]">
        <motion.h2
          className="absolute inset-0 grid place-items-center px-5 text-center text-[clamp(4rem,15vw,15rem)] font-bold leading-[0.82]"
          style={{ opacity: fade }}
        >
          {title}
        </motion.h2>
        <div data-fx-row className="absolute inset-0 [transform-style:preserve-3d]">
          {shots.map((s, i) => (
            <Frame key={s.image} shot={s} i={i} n={shots.length} p={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
