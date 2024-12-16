'use client';
import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { API_ENDPOINT, COOKIES_KEY, HEADERS } from '@/features/home/constants';
import { ContentForm } from '@/features/home/components/content-form';
import { AppProvider, useAppContext } from '@/features/home/context/AppContext';
import { CardHeaderComponent } from '@/features/home/components/card-header';
import { Result } from '@/features/home/components/result';
import { useLoadCookies } from '@/features/home/hooks/useLoadCookies';
import { promptFormat } from '@/features/home/utils/prompt';
import { ResultType } from '@/features/home/types';
import { setCookies } from '@/features/home/utils/cookies';

const Home = () => {
  const { form } = useAppContext();

  // 生成AIの応答結果
  const [result, setResult] = useState<ResultType>();

  // ローディング
  const [selected, setSelected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingContent, setIsLoadingContent] = useState<boolean>(true);

  // Cookieからデータを取得する
  useLoadCookies(form, setIsLoadingContent);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Cookieに入力した選択肢を保存
    setCookies(form);

    setIsLoading(true);
    const prompt = promptFormat(form);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ prompt_post: prompt }),
      });
      // レスポンス結果をjson型に変更
      const data = await response.json();
      let message = data.message;
      message = message.replace(/```json|```/g, '').trim();
      const jsonMessage = JSON.parse(message);

      setResult({ selection: jsonMessage.選択結果, reason: jsonMessage.理由 });
      setSelected(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = useCallback(() => {
    setSelected(false);
    setResult({ selection: '', reason: '' });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center from-blue-100 to-blue-200 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeaderComponent selected={selected} />
        {isLoadingContent ? (
          <div className="flex items-center justify-center">
            <div className="spinner"></div>
          </div>
        ) : (
          <CardContent>
            {!selected ? (
              <ContentForm handleSubmit={handleSubmit} isLoading={isLoading} />
            ) : (
              result && <Result result={result} />
            )}
          </CardContent>
        )}
        <CardFooter className="flex justify-center">
          {selected && (
            <Button onClick={handleReset} variant="outline">
              もう一度選ぶ
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
