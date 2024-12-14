import { COOKIES_KEY } from '@/features/home/constants';
import { Item } from '@/features/home/types';
import Cookies from 'js-cookie';

export const loadDataFromCookies = () => {
  try {
    const savedItems = Cookies.get(COOKIES_KEY.FORM_ITEMS);
    const savedType = Cookies.get(COOKIES_KEY.FORM_TYPE);
    const savedBias = Cookies.get(COOKIES_KEY.FORM_BIAS) || '';

    const parsedItems = savedItems ? (JSON.parse(savedItems) as Item[]) : [];
    const parsedType = savedType ? (JSON.parse(savedType) as string) : '';
    const parsedBias = savedType ? (JSON.parse(savedBias) as string) : '';

    return { parsedItems, parsedType, parsedBias };
  } catch (error) {
    console.error('Failed to parse cookies', error);
    return { parsedItems: [], parsedType: '' };
  }
};
