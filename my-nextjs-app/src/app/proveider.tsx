'use client';
import i18n from 'i18next';
import { useCurrentLocale } from 'next-i18n-router/client';
import { i18nConfig } from '@/config/i18nConfig ';
import { ReactNode } from 'react';
import { i18nextInitOptions } from '@/config/i18nextInitOptions';
import { I18nextProvider } from 'react-i18next';

i18n.init(i18nextInitOptions, (err) => {
  if (err) {
    console.error('i18next failed to initialize', err);
  }
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  i18n.changeLanguage(useCurrentLocale(i18nConfig));
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
