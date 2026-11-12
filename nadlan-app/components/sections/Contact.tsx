'use client';

import { useState } from 'react';
import type { Site } from '@/lib/constants';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { SplitText } from '@/components/effects/SplitText';

type Props = {
  site: Site;
  title: string;
  text: string;
  /** אפשרויות לשדה "במה מתעניינים" */
  interests: string[];
  submitLabel: string;
  doneText: string;
  className?: string;
  headingClass?: string;
};

export function Contact({ site, title, text, interests, submitLabel, doneText, className, headingClass }: Props) {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className={cn('scroll-mt-16 py-24 md:py-36', className)}>
      <Container className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <div>
          <h2 className={cn('text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95]', headingClass)}>
            <SplitText text={title} />
          </h2>
          <p className="mt-6 max-w-[46ch] text-mute">{text}</p>

          <ul id="team" className="mt-12 scroll-mt-24 list-none border-t border-line p-0">
            {site.agents.map((a) => (
              <li key={a.phone} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4">
                <span>
                  <span className="block text-lg font-medium">{a.name}</span>
                  <span className="block text-[0.92rem] text-mute">{a.role}</span>
                </span>
                <a href={`tel:${a.phone.replace(/-/g, '')}`} className="ltr text-lg text-acc no-underline hover:underline">
                  {a.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-line bg-bg2 p-6 sm:p-10">
          {sent ? (
            <div role="status" className="flex h-full min-h-72 flex-col justify-center">
              <p className="font-display text-4xl leading-tight">הפנייה נשלחה</p>
              <p className="mt-4 text-mute">{doneText}</p>
              <p className="mt-8">
                <button type="button" className="cursor-pointer border-0 bg-transparent p-0 text-acc underline" onClick={() => setSent(false)}>
                  שליחת פנייה נוספת
                </button>
              </p>
            </div>
          ) : (
            <form
              className="grid gap-7 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <Input label="שם מלא" name="name" required />
              <Input label="טלפון" name="phone" type="tel" required ltr placeholder="050-000-0000" />
              <Select label="במה אתם מתעניינים" name="interest" options={interests} className="sm:col-span-2" />
              <Textarea label="משהו שכדאי שנדע (לא חובה)" name="message" className="sm:col-span-2" />
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-2">
                <Button type="submit">{submitLabel}</Button>
                <span className="text-[0.92rem] text-mute">
                  או בטלפון{' '}
                  <a href={`tel:${site.phone.replace(/-/g, '')}`} className="ltr text-fg">
                    {site.phone}
                  </a>
                </span>
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
