'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, Phone, X } from 'lucide-react';
import type { Site } from '@/lib/constants';
import { cn, href } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Navbar({ site }: { site: Site }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const tel = `tel:${site.phone.replace(/-/g, '')}`;

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  /* כשהתפריט פתוח הדף שמתחתיו לא נגלל, ו־Escape סוגר */
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500',
          solid && !open ? 'border-line bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-xl' : 'border-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-14">
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

          <a href={tel} className="ltr hidden text-[0.95rem] text-fg no-underline md:block">
            {site.phone}
          </a>

          <div className="flex items-center gap-2 md:hidden">
            <a href={tel} aria-label={`חיוג ל${site.name}`} className="grid h-11 w-11 place-items-center border border-fg/40 text-fg">
              <Phone size={18} strokeWidth={1.5} aria-hidden />
            </a>
            <button
              type="button"
              className="grid h-11 w-11 cursor-pointer place-items-center border border-fg/40 bg-transparent"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'סגירת התפריט' : 'פתיחת התפריט'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} strokeWidth={1.5} aria-hidden /> : <Menu size={20} strokeWidth={1.5} aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      {/* תפריט מסך מלא לטלפון: נפתח כמו וילון מלמעלה, והשורות עולות אחת אחת */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="ראשי"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg px-5 pb-8 pt-24 md:hidden"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <ul className="m-0 list-none p-0">
              {site.nav.map((n, i) => (
                <li key={n.href} className="overflow-hidden border-b border-line">
                  <motion.a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-display text-[clamp(2.6rem,13vw,4.5rem)] leading-none text-fg no-underline"
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.07 }}
                  >
                    {n.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
              <a href={tel} className="ltr text-2xl text-acc no-underline">
                {site.phone}
              </a>
              <p className="mt-2 text-[0.92rem] text-mute">{site.address}</p>
              <p className="text-[0.92rem] text-mute">{site.hours}</p>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
