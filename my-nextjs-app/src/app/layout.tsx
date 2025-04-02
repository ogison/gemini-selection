import type { Metadata } from 'next';

import i18n from 'i18next';
import '@/styles/globals.css';
import { i18nextInitOptions } from '@/config/i18nextInitOptions';
import { I18nProvider } from './proveider';
import { geistMono, geistSans } from '@/styles/font';
import { cn } from '@/lib/utils';

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
    <html lang={resolvedParams.locale} className={cn(geistSans.variable, geistMono.variable)}>
      <I18nProvider>
        <body className={`antialiased`}>{children}</body>
      </I18nProvider>
    </html>
  );
}
