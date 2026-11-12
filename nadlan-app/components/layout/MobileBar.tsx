'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CalendarDays, Phone } from 'lucide-react';
import type { Site } from '@/lib/constants';

/* סרגל פעולה תחתון לטלפון: חיוג ותיאום, תמיד בהישג אגודל.
   מופיע אחרי המסך הראשון ונעלם כשמגיעים לטופס עצמו. */
export function MobileBar({ site, cta }: { site: Site; cta: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => {
      const contact = document.getElementById('contact');
      const atForm = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.7 : false;
      setShow(window.scrollY > window.innerHeight * 0.6 && !atForm);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[auto_1fr] border-t border-line bg-[color-mix(in_srgb,var(--bg)_86%,transparent)] pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
      initial={false}
      animate={{ y: show ? '0%' : '110%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden={!show}
    >
      <a
        href={`tel:${site.phone.replace(/-/g, '')}`}
        tabIndex={show ? 0 : -1}
        className="flex min-h-14 items-center gap-2.5 border-e border-line px-5 text-fg no-underline"
      >
        <Phone size={18} strokeWidth={1.5} aria-hidden />
        חיוג
      </a>
      <a
        href="#contact"
        tabIndex={show ? 0 : -1}
        className="flex min-h-14 items-center justify-center gap-2.5 bg-acc px-5 font-medium text-bg no-underline"
      >
        <CalendarDays size={18} strokeWidth={1.5} aria-hidden />
        {cta}
      </a>
    </motion.div>
  );
}
