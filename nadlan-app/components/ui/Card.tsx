'use client';

import { useEffect, useRef } from 'react';
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
  const scene = useRef<HTMLDivElement>(null);

  /* בטלפון אין סמן שאפשר לעקוב אחריו, אז הכרטיס נוטה לפי מיקומו על המסך:
     נוטה לאחור כשהוא נכנס מלמטה, מתיישר במרכז ונוטה קדימה כשהוא יוצא. */
  useEffect(() => {
    const host = scene.current;
    const el = body.current;
    if (!host || !el) return;
    if (!window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let visible = false;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!visible) return;
      const r = host.getBoundingClientRect();
      const vh = window.innerHeight;
      const c = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)));
      el.style.transition = 'none';
      el.style.transform = `rotateX(${c * -max * 1.15}deg) scale(${1 - Math.abs(c) * 0.04})`;
      if (glare.current) {
        glare.current.style.opacity = '1';
        glare.current.style.background = `linear-gradient(180deg, transparent ${30 + c * 40}%, rgb(255 255 255 / 0.2) ${50 + c * 40}%, transparent ${70 + c * 40}%)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      onScroll();
    });
    io.observe(host);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [max]);

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

  function leave(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse') return;
    cancelAnimationFrame(raf.current);
    if (body.current) {
      body.current.style.transition = 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1)';
      body.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
    }
    if (glare.current) glare.current.style.opacity = '0';
  }

  return (
    <div ref={scene} className={cn('tilt-scene', className)} onPointerMove={move} onPointerLeave={leave}>
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
