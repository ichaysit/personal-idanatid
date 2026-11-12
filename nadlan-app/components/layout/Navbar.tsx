'use client';

import { useEffect, useState } from 'react';
import type { Site } from '@/lib/constants';
import { cn, href } from '@/lib/utils';

export function Navbar({ site }: { site: Site }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500',
        solid || open
          ? 'border-line bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-xl'
          : 'border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-14">
        <a href={href(site.path)} className="font-display text-[1.7rem] leading-none text-fg no-underline">
          {site.name}
        </a>

        <nav aria-label="ראשי" className="hidden items-center gap-8 md:flex">
          {site.nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative py-1 text-[0.95rem] text-fg no-underline after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-acc after:transition-transform after:duration-500 hover:after:scale-x-100"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a href={`tel:${site.phone.replace(/-/g, '')}`} className="ltr hidden text-[0.95rem] text-fg no-underline md:block">
          {site.phone}
        </a>

        <button
          type="button"
          className="cursor-pointer border border-fg/40 bg-transparent px-4 py-1.5 text-[0.9rem] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'סגירה' : 'תפריט'}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="ראשי" className="border-t border-line px-5 pb-6 pt-2 md:hidden">
          {site.nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-4 font-display text-2xl text-fg no-underline"
            >
              {n.label}
            </a>
          ))}
          <a href={`tel:${site.phone.replace(/-/g, '')}`} className="ltr mt-5 text-lg text-acc no-underline">
            {site.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
