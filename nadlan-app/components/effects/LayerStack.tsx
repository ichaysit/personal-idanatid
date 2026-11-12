'use client';

import { useRef } from 'react';
import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { cn, img } from '@/lib/utils';

/* שרטוט מפורק: מפלסי הבית מונחים זה על זה במבט איזומטרי,
   והגלילה מרימה אותם זה מעל זה כמו בתוכנית אדריכלית. */

type Level = { image: string; title: string; text: string };

function Plate({ level, i, n, p }: { level: Level; i: number; n: number; p: MotionValue<number> }) {
  /* המרווח בין המפלסים נלקח מ־CSS, כדי שבטלפון הם ייפתחו פחות ולא יכסו את הטקסט */
  const t = useTransform(p, [0.05, 0.75], [0, 1]);
  const z = useMotionTemplate`calc(${i * 12}px + ${t} * ${i} * var(--gap))`;
  return (
    <motion.div className="absolute inset-0 border-2 border-fg bg-bg" style={{ z, zIndex: i }}>
      <img src={img(level.image)} alt="" className="h-full w-full object-cover" />
      <span className="absolute start-0 top-0 bg-fg px-3 py-1 font-display text-sm text-bg">
        {`מפלס ${i + 1} מתוך ${n}`}
      </span>
    </motion.div>
  );
}

export function LayerStack({ levels, heading }: { levels: Level[]; heading: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.5 });
  const rotateZ = useTransform(p, [0, 1], [-48, -22]);
  const active = useTransform(p, (v) => Math.min(levels.length - 1, Math.floor(v * levels.length * 0.999)));

  return (
    <section ref={ref} className="relative" style={{ height: reduce ? undefined : '300vh' }}>
      <div className={cn('grid items-center gap-8 px-5 sm:px-8 lg:px-14', !reduce && 'sticky top-0 h-screen overflow-hidden pt-20 md:grid-cols-2')}>
        <div className="relative z-10 max-md:pt-2">
          <h2 className="text-[clamp(2rem,4.6vw,4.25rem)] font-bold leading-[1.02]">{heading}</h2>
          <ul className="m-0 mt-6 list-none p-0 md:mt-10">
            {levels.map((l, i) => (
              <Row key={l.title} level={l} i={i} active={active} />
            ))}
          </ul>
        </div>
        {!reduce && (
          <div className="relative mx-auto aspect-square w-[min(66vw,460px)] [--gap:62px] [perspective:1800px] max-md:-mt-2 md:[--gap:125px]">
            <motion.div
              className="absolute inset-x-[14%] bottom-[4%] top-[24%] [transform-style:preserve-3d]"
              style={{ rotateX: 60, rotateZ }}
            >
              {levels.map((l, i) => (
                <Plate key={l.title} level={l} i={i} n={levels.length} p={p} />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

function Row({ level, i, active }: { level: Level; i: number; active: MotionValue<number> }) {
  const opacity = useTransform(active, (a) => (a === i ? 1 : 0.35));
  const x = useTransform(active, (a) => (a === i ? -14 : 0));
  return (
    <motion.li className="border-t border-line py-2 md:py-5" style={{ opacity, x }}>
      <span className="block font-display text-[clamp(1.3rem,2.4vw,2rem)] font-bold leading-tight">{level.title}</span>
      <span className="block max-w-[42ch] text-[0.95rem] text-mute max-md:hidden">{level.text}</span>
    </motion.li>
  );
}
