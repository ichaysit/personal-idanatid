import type { Metadata, Viewport } from 'next';
import { fontVars } from '@/styles/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'שלושה אתרי נדל״ן לדוגמה',
  description: 'שלושה אתרים לסוכנויות נדל״ן בישראל: מגדלים בתל אביב, וילות על קו החוף ובתי אדריכלים בהרים.',
  robots: { index: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
