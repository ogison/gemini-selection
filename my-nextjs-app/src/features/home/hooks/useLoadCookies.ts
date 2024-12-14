import { useEffect } from 'react';
import { loadDataFromCookies } from '../utils/cookies';
import { UseFormReturn } from 'react-hook-form';
import { FormSchemaType } from '../types';

export const useLoadCookies = (
  form: UseFormReturn<FormSchemaType>,
  setIsLoadingContent: (isLoading: boolean) => void,
) => {
  useEffect(() => {
    const { parsedItems, parsedType, parsedBias } = loadDataFromCookies();
    form.setValue('items', parsedItems);
    form.setValue('type', parsedType);
    form.setValue('bias', parsedBias || '');
    setIsLoadingContent(false);
  }, [setIsLoadingContent]);
};
