import { COOKIES_KEY } from '@/features/home/constants';
import { Item } from '@/features/home/types';
import Cookies from 'js-cookie';

export const loadDataFromCookies = () => {
  try {
    const savedItems = Cookies.get(COOKIES_KEY.FORM_ITEMS);
    const savedType = Cookies.get(COOKIES_KEY.FORM_TYPE);

    const parsedItems = savedItems ? (JSON.parse(savedItems) as Item[]) : [];
    const parsedType = savedType ? (JSON.parse(savedType) as string) : '';

    return { parsedItems, parsedType };
  } catch (error) {
    console.error('Failed to parse cookies', error);
    return { parsedItems: [], parsedType: '' };
  }
};
