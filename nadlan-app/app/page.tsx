import { sites } from '@/lib/constants';
import { href, img } from '@/lib/utils';

const covers: Record<string, string> = { rakia: 'tower-glass', bustan: 'villa-hero', even: 'house-dusk' };

export default function Page() {
  return (
    <main data-site="index" className="flex min-h-screen flex-col">
      <header className="px-5 py-10 sm:px-8 lg:px-14">
        <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-light leading-tight">שלושה אתרי נדל״ן לדוגמה</h1>
        <p className="mt-3 max-w-[60ch] text-mute">שלוש סוכנויות בדויות, שלוש זהויות. בחרו אתר.</p>
      </header>
      <ul className="m-0 grid flex-1 list-none p-0 md:grid-cols-3">
        {sites.map((s) => (
          <li key={s.key} data-site={s.key} className="relative min-h-[60vh] border-t border-line md:min-h-0 md:border-s md:first:border-s-0">
            <a href={href(s.path)} className="group absolute inset-0 flex flex-col justify-end overflow-hidden p-6 text-fg no-underline sm:p-10">
              <img
                src={img(covers[s.key])}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-45 transition-[opacity,scale] duration-700 ease-out-expo group-hover:scale-105 group-hover:opacity-70"
              />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
              <span className="relative font-display text-[clamp(3rem,6vw,5.5rem)] font-bold leading-none">{s.name}</span>
              <span className="relative mt-3 text-fg/85">{s.tagline}</span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
