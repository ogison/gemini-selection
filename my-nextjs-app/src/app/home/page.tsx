'use client';
import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ContentForm } from '@/features/home/components/content-form';
import { AppProvider, useAppContext } from '@/features/home/context/AppContext';
import { CardHeaderComponent } from '@/features/home/components/card-header';
import { Result } from '@/features/home/components/result';
import { useLoadCookies } from '@/features/home/hooks/useLoadCookies';
import { ResultType } from '@/features/home/types';
import { handleSubmit } from '@/features/home/handlers/handleSubmit';
import { LanguageToggle } from '@/features/home/components/language-toggle';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { form } = useAppContext();

  const [result, setResult] = useState<ResultType>();
  const { t } = useTranslation();

  // ローディング
  const [selected, setSelected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingContent, setIsLoadingContent] = useState<boolean>(true);

  // Cookieからデータを取得する
  useLoadCookies(form, setIsLoadingContent);

  const handleSubmitCallback = (e: React.FormEvent) => handleSubmit(e, form, setIsLoading, setSelected, setResult);

  const handleReset = useCallback(() => {
    setSelected(false);
    setResult({ selection: '', reason: '' });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center from-blue-100 to-blue-200 p-4">
      <Card className="w-full max-w-2xl">
        <LanguageToggle />
        <CardHeaderComponent selected={selected} />
        {isLoadingContent ? (
          <div className="flex items-center justify-center">
            <div className="spinner"></div>
          </div>
        ) : (
          <CardContent>
            {!selected ? (
              <ContentForm handleSubmit={handleSubmitCallback} isLoading={isLoading} />
            ) : (
              result && <Result result={result} />
            )}
          </CardContent>
        )}
        <CardFooter className="flex justify-center">
          {selected && (
            <Button onClick={handleReset} variant="outline">
              {t('RETURN')}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      <AppProvider>
        <Home />
      </AppProvider>
    </div>
  );
};

export default HomePage;
