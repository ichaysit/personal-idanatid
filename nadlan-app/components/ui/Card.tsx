'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** זווית הטיה מרבית במעלות */
  max?: number;
};

/* כרטיס תלת־ממדי: נוטה אחרי הסמן, עם ברק שנע על פני השטח.
   ילדים עם translateZ צפים מעל התמונה. */
export function TiltCard({ children, className, max = 9 }: Props) {
  const body = useRef<HTMLDivElement>(null);
  const glare = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  function move(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse') return;
    const el = body.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transition = 'transform 80ms linear';
      el.style.transform = `rotateY(${(px - 0.5) * 2 * max}deg) rotateX(${(0.5 - py) * 2 * max}deg)`;
      if (glare.current) {
        glare.current.style.opacity = '1';
        glare.current.style.background = `radial-gradient(60% 60% at ${px * 100}% ${py * 100}%, rgb(255 255 255 / 0.22), transparent 70%)`;
      }
    });
  }

  function leave() {
    cancelAnimationFrame(raf.current);
    if (body.current) {
      body.current.style.transition = 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1)';
      body.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
    }
    if (glare.current) glare.current.style.opacity = '0';
  }

  return (
    <div className={cn('tilt-scene', className)} onPointerMove={move} onPointerLeave={leave}>
      <div ref={body} className="tilt-body relative h-full w-full">
        {children}
        <div
          ref={glare}
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-500"
        />
      </div>
    </div>
  );
}
