'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react';

/* פס מילים שנע עם הגלילה ונוטה לפי המהירות שלה: גלילה מהירה מטה אותו חזק יותר. */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['-8%', '-42%']);
  const v = useSpring(useVelocity(scrollY), { stiffness: 200, damping: 40 });
  const skew = useTransform(v, [-2500, 0, 2500], [14, 0, -14], { clamp: true });
  const row = [...items, ...items, ...items, ...items];
  return (
    <div ref={ref} data-fx-marquee dir="ltr" aria-hidden className={`overflow-hidden border-y border-line py-5 ${className ?? ''}`}>
      <motion.div className="flex w-max items-center gap-10 whitespace-nowrap" style={reduce ? undefined : { x, skewX: skew }}>
        {row.map((t, i) => (
          <span key={i} dir="rtl" className="flex items-center gap-10 font-display text-[clamp(2.5rem,7vw,6rem)] leading-none">
            {t}
            <span className="inline-block h-3 w-3 rotate-45 bg-acc" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
