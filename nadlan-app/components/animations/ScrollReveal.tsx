'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** curtain: וילון שנפתח מעל תמונה. rise: עלייה קצרה לטקסט. */
  variant?: 'curtain' | 'rise';
  delay?: number;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/* הצפייה נעשית על העטיפה החיצונית, שאינה חתוכה. אם צופים באלמנט החתוך עצמו,
   הדפדפן רואה בו קו בגובה אפס, ותמונה שנמצאת מעל המסך לא תיחשף לעולם. */
export function ScrollReveal({ children, className, variant = 'rise', delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const seen = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  if (reduce) return <div className={className}>{children}</div>;

  const hidden =
    variant === 'curtain' ? { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.08 } : { opacity: 0, y: 28 };
  const shown =
    variant === 'curtain' ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 } : { opacity: 1, y: 0 };

  return (
    <div ref={ref} className={cn(variant === 'curtain' && 'overflow-hidden', className)}>
      <motion.div
        className="h-full w-full"
        initial={hidden}
        animate={seen ? shown : hidden}
        transition={{ duration: variant === 'curtain' ? 1.2 : 0.8, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
