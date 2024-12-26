import en from '@/constants/en';
import ja from '@/constants/ja';
import { InitOptions } from 'i18next';

export const i18nextInitOptions: InitOptions = {
  lng: 'ja',
  fallbackLng: 'ja',
  resources: {
    en,
    ja,
  },
};
