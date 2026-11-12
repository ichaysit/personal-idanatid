'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { img } from '@/lib/utils';

/* מנסרה מסתובבת: ארבע תמונות על ארבע פאות, והגלילה מסובבת אותה פאה אחרי פאה. */

type Face = { image: string; title: string; text: string };

export function Prism({ faces, heading }: { faces: Face[]; heading: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.5 });
  const rotateY = useTransform(smooth, [0, 1], [0, -90 * (faces.length - 1)]);
  const count = useTransform(smooth, (v) => Math.min(faces.length, Math.round(v * (faces.length - 1)) + 1));
  const label = useTransform(count, (v) => `${v} / ${faces.length}`);

  if (reduce) {
    return (
      <section className="grid gap-8 px-5 py-24 md:grid-cols-2">
        {faces.map((f) => (
          <figure key={f.image} className="m-0">
            <img src={img(f.image)} alt="" className="aspect-[4/3] w-full object-cover" />
            <figcaption className="mt-3 font-display text-2xl">{f.title}</figcaption>
          </figure>
        ))}
      </section>
    );
  }

  return (
    <section ref={ref} className="relative" style={{ height: `${faces.length * 90}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden pt-16 [--w:min(80vw,760px)]">
        <div className="mb-8 flex w-[var(--w)] items-baseline justify-between">
          <h2 className="text-[clamp(2rem,4.4vw,4rem)] font-light leading-none">{heading}</h2>
          <motion.span className="ltr text-mute">{label}</motion.span>
        </div>
        <div className="h-[calc(var(--w)*0.68)] w-[var(--w)] [perspective:1600px]">
          <motion.div
            className="relative h-full w-full [transform-style:preserve-3d]"
            style={{ rotateY, z: 'calc(var(--w) / -2)' }}
          >
            {faces.map((f, i) => (
              <figure
                key={f.image}
                className="absolute inset-0 m-0 [backface-visibility:hidden]"
                style={{ transform: `rotateY(${i * 90}deg) translateZ(calc(var(--w) / 2))` }}
              >
                <img src={img(f.image)} alt="" className="h-full w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/95 to-transparent p-5 pt-16">
                  <span className="block font-display text-[clamp(1.5rem,3vw,2.4rem)] leading-tight">{f.title}</span>
                  <span className="mt-1 block max-w-[44ch] text-[0.95rem] text-fg/80">{f.text}</span>
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
