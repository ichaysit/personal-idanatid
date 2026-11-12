'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** כמה אחוזים התוכן זז ביחס לגלילה. ערך שלילי הופך כיוון. */
  strength?: number;
};

export function ParallaxWrapper({ children, className, strength = 12 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div className="h-full w-full" style={reduce ? undefined : { y, scale: 1 + Math.abs(strength) / 40 }}>
        {children}
      </motion.div>
    </div>
  );
}
