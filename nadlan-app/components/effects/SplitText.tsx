'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

/* כותרת שנחשפת מילה אחר מילה, כל מילה עולה מתוך מסכה ומסתובבת מעט במרחב. */
export function SplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const seen = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });
  if (reduce) return <span className={className}>{text}</span>;
  const words = text.split(' ');
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em] [perspective:600px]">
          <motion.span
            className="inline-block origin-bottom"
            initial={{ y: '115%', rotateX: -70 }}
            animate={seen ? { y: '0%', rotateX: 0 } : { y: '115%', rotateX: -70 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.06 }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  );
}
