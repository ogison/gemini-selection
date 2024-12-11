import { useEffect } from 'react';
import { loadDataFromCookies } from '../utils/cookies';

export const useLoadCookies = (
  setItems: (items: any[]) => void,
  setSelectType: (type: string) => void,
  setIsLoadingContent: (isLoading: boolean) => void,
) => {
  useEffect(() => {
    const { parsedItems, parsedType } = loadDataFromCookies();
    setItems(parsedItems);
    setSelectType(parsedType);
    setIsLoadingContent(false);
  }, [setItems, setSelectType, setIsLoadingContent]);
};
