import type { Site } from '@/lib/constants';
import { href } from '@/lib/utils';
import { Container } from './Container';

export function Footer({ site }: { site: Site }) {
  return (
    <footer className="border-t border-line py-12 text-[0.95rem]">
      <Container className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-4xl leading-none">{site.name}</p>
          <p className="mt-3 max-w-[32ch] text-mute">{site.tagline}</p>
        </div>
        <address className="not-italic">
          <p>{site.address}</p>
          <p className="mt-2 text-mute">{site.hours}</p>
        </address>
        <div>
          <p>
            <a className="ltr text-fg no-underline hover:text-acc" href={`tel:${site.phone.replace(/-/g, '')}`}>
              {site.phone}
            </a>
          </p>
          <p>
            <a className="ltr text-fg no-underline hover:text-acc" href={`tel:${site.mobile.replace(/-/g, '')}`}>
              {site.mobile}
            </a>
          </p>
          <p className="ltr text-mute">{site.email}</p>
        </div>
      </Container>
      <Container className="mt-10 flex flex-wrap justify-between gap-x-8 gap-y-2 border-t border-line pt-6 text-[0.85rem] text-mute">
        <p>{site.license}</p>
        <p>אתר לדוגמה. הסוכנות, הנכסים, המחירים והטלפונים בדויים. צילומים: Unsplash.</p>
        <a href={href('/')} className="text-mute hover:text-fg">
          לשלושת האתרים
        </a>
      </Container>
    </footer>
  );
}
