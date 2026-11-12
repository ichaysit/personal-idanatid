'use client';

import { motion, useReducedMotion } from 'motion/react';

const EASE = [0.16, 1, 0.3, 1] as const;

/** רצף טעינה אחד: כל שורה עולה מתוך מסכה, אחת אחרי השנייה. */
export function StaggerContainer({
  children,
  className,
  delay = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="shown"
      variants={{ shown: { transition: { staggerChildren: 0.11, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerLine({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
      <motion.span
        className={`block ${className ?? ''}`}
        variants={
          reduce
            ? { hidden: { opacity: 1 }, shown: { opacity: 1 } }
            : {
                hidden: { y: '110%' },
                shown: { y: '0%', transition: { duration: 1.1, ease: EASE } },
              }
        }
      >
        {children}
      </motion.span>
    </span>
  );
}

export function StaggerFade({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0 },
        shown: { opacity: 1, transition: { duration: 0.9, ease: 'easeOut' } },
      }}
    >
      {children}
    </motion.div>
  );
}
