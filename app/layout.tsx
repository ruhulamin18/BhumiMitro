import type { Metadata } from 'next';
import { Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageContext';
import { GovernmentHeader } from '@/components/GovernmentHeader';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-noto-bengali',
});

export const metadata: Metadata = {
  title: 'ভূমিমিত্র (BhumiMitro) | Land Record Review',
  description:
    'BhumiMitro is an independent preview for reviewing illustrative Bangladesh land-record scenarios. Not a government service or legal ownership decision.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'ভূমিমিত্র (BhumiMitro) — Land Record Review',
    description:
      'Illustrative land-record screening. No official records are queried; this is not a legal title determination.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BhumiMitro — Land Record Review',
    description:
      'Illustrative land-record screening. No official records are queried; this is not a legal title determination.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`scroll-smooth ${notoSansBengali.variable}`}>
      <body
        className={`${notoSansBengali.className} min-h-screen bg-[#F6F8F6] text-slate-900 antialiased flex flex-col selection:bg-emerald-200 selection:text-emerald-950`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <GovernmentHeader />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
