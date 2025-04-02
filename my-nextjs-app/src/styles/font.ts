import localFont from 'next/font/local';

export const geistSans = localFont({
  src: '../styles/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export const geistMono = localFont({
  src: '../styles/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
