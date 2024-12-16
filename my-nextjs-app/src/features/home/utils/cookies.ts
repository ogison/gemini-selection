import { COOKIES_KEY } from '@/features/home/constants';
import { FormSchemaType, Item } from '@/features/home/types';
import Cookies from 'js-cookie';
import { UseFormReturn } from 'react-hook-form';

export const setCookies = (form: UseFormReturn<FormSchemaType>) => {
  const items = form.getValues('items');
  const type = form.getValues('type');
  const bias = form.getValues('bias');

  Cookies.set(COOKIES_KEY.FORM_TYPE, JSON.stringify(type), {
    expires: 3,
  });
  Cookies.set(COOKIES_KEY.FORM_BIAS, JSON.stringify(bias), { expires: 3 });
  Cookies.set(COOKIES_KEY.FORM_ITEMS, JSON.stringify(items), { expires: 3 });
};

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
