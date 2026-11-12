'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: 'solid' | 'outline';
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
};

/* מילוי שנשפך מלמטה במעבר עכבר, וכפתור "מגנטי" שנמשך מעט אל הסמן. בלי פינות מעוגלות. */
export function Button({ children, href, variant = 'solid', className, type = 'button', onClick }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  function move(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.22;
    const y = (e.clientY - r.top - r.height / 2) * 0.3;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  }
  function leave() {
    if (ref.current) ref.current.style.transform = '';
  }

  const cls = cn(
    'group relative inline-flex min-h-12 items-center justify-center overflow-hidden border px-7 py-3 text-[0.95rem] font-medium no-underline transition-[color,border-color,transform] duration-300 ease-out active:scale-[0.97]',
    variant === 'solid'
      ? 'border-acc bg-acc text-bg hover:text-acc'
      : 'border-fg/50 text-fg hover:border-fg hover:text-bg',
    className,
  );
  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-out-expo group-hover:scale-y-100',
          variant === 'solid' ? 'bg-bg' : 'bg-fg',
        )}
      />
      <span className="relative">{children}</span>
    </>
  );
  if (href)
    return (
      <a ref={(el) => void (ref.current = el)} href={href} className={cls} onPointerMove={move} onPointerLeave={leave}>
        {inner}
      </a>
    );
  return (
    <button
      ref={(el) => void (ref.current = el)}
      type={type}
      onClick={onClick}
      className={cn(cls, 'cursor-pointer')}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      {inner}
    </button>
  );
}
