import type { Metadata, Viewport } from 'next';
import { Footer } from '@/components/layout/Footer';
import { MobileBar } from '@/components/layout/MobileBar';
import { Navbar } from '@/components/layout/Navbar';
import { Contact } from '@/components/sections/Contact';
import { Catalogue } from '@/components/sections/even/Catalogue';
import { Hero } from '@/components/sections/even/Hero';
import { Materials } from '@/components/sections/even/Materials';
import { even } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'אבן וקו | בתי אדריכלים בהרי ירושלים, בכרמל ובגליל',
  description: 'בתי אדריכלים למכירה בעין כרם, במבשרת ציון, בזכרון יעקב, בחיפה, בראש פינה ובמצפה רמון.',
};

export const viewport: Viewport = { themeColor: '#dcd8d0' };

export default function Page() {
  return (
    <div data-site="even">
      <Navbar site={even} />
      <main>
        <Hero />
        <Catalogue />
        <Materials />
        <Contact
          site={even}
          title="ביקור בבית, עם האדריכל"
          text="בכל ביקור מצטרף אדריכל מהסטודיו שמסביר איך הבית נבנה ומה אפשר לשנות בו. הביקור נמשך כשעה וחצי ואינו מחייב."
          interests={even.properties.map((p) => `${p.name}, ${p.place}`).concat('עוד לא החלטתי')}
          submitLabel="בקשה לביקור"
          doneText="נחזור אליכם בתוך שני ימי עסקים עם שלושה מועדים אפשריים."
          headingClass="font-bold"
        />
      </main>
      <Footer site={even} />
      <MobileBar site={even} cta="ביקור בבית" />
    </div>
  );
}
