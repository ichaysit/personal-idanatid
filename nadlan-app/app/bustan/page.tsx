import type { Metadata, Viewport } from 'next';
import { Footer } from '@/components/layout/Footer';
import { MobileBar } from '@/components/layout/MobileBar';
import { Navbar } from '@/components/layout/Navbar';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/bustan/Hero';
import { Intro, Listings } from '@/components/sections/bustan/Listings';
import { Night, Service } from '@/components/sections/bustan/Service';
import { bustan } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'בוסתן | וילות פרטיות על קו החוף',
  description: 'וילות פרטיות עם בריכה בארסוף, בהרצליה פיתוח, בקיסריה, בסביון ובכפר שמריהו.',
};

export const viewport: Viewport = { themeColor: '#141c17' };

export default function Page() {
  return (
    <div data-site="bustan">
      <Navbar site={bustan} />
      <main>
        <Hero />
        <Intro />
        <Listings />
        <Night />
        <Service />
        <Contact
          site={bustan}
          title="נדבר לפני שנוסעים לראות"
          text="שיחה ראשונה של עשרים דקות חוסכת סיורים מיותרים. ספרו לנו מה חשוב לכם, ונחזור עם שתיים או שלוש וילות שמתאימות."
          interests={['רכישת וילה', 'מכירת וילה שבבעלותי', 'הערכת שווי', 'ליווי לתושבי חוץ']}
          submitLabel="בקשה לשיחה"
          doneText="רונית או אחד הסוכנים יחזרו אליכם בתוך יום עסקים אחד."
          headingClass="font-light"
        />
      </main>
      <Footer site={bustan} />
      <MobileBar site={bustan} cta="בקשה לשיחה" />
    </div>
  );
}
