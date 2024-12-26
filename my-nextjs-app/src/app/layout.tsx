import type { Metadata } from 'next';

import localFont from 'next/font/local';
import i18n from 'i18next';
import './globals.css';
import { i18nextInitOptions } from '@/config/i18nextInitOptions';
import { I18nProvider } from './provider/proveider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'AI Selector',
  description: 'Smart decision-making with AI for any situation.',
};

i18n.init(i18nextInitOptions, (err) => {
  if (err) {
    console.error('i18next failed to initialize', err);
  }
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const resolvedParams = await params;
  return (
    <html lang={resolvedParams.locale}>
      <I18nProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
      </I18nProvider>
    </html>
  );
}
