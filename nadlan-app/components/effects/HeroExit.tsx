'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

/* כשגוללים מהמסך הראשון, התוכן שלו נסוג לעומק ומתעמעם במקום פשוט לעלות. */
export function HeroExit({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 700], [1, 0.9]);
  const opacity = useTransform(scrollY, [0, 520], [1, 0]);
  const y = useTransform(scrollY, [0, 700], [0, -70]);
  return (
    <motion.div className={className} style={reduce ? undefined : { scale, opacity, y, transformOrigin: '50% 100%' }}>
      {children}
    </motion.div>
  );
}
