'use client';
import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { API_ENDPOINT, COOKIES_KEY, promptFormat, HEADERS } from '@/features/home/constants';
import { ContentForm } from '@/features/home/components/content-form';
import { AppProvider, useAppContext } from '@/features/home/context/AppContext';
import { CardHeaderComponent } from '@/features/home/components/card-header';
import { Result } from '@/features/home/components/result';
import { useLoadCookies } from '@/features/home/hooks/useLoadCookies';

const Home = () => {
  const { items, setItems, selectType, setSelectType } = useAppContext();
  const [selected, setSelected] = useState<boolean>(false);
  const [result, setResult] = useState<string>();
  const [resultReason, setResultReason] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingContent, setIsLoadingContent] = useState<boolean>(true);

  // Cookieからデータを取得する
  useLoadCookies(setItems, setSelectType, setIsLoadingContent);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Cookieに入力した選択肢を保存
    Cookies.set(COOKIES_KEY.FORM_ITEMS, JSON.stringify(items), { expires: 3 });
    Cookies.set(COOKIES_KEY.FORM_TYPE, JSON.stringify(selectType), {
      expires: 3,
    });

    setIsLoading(true);
    const choices = items.map((item) => `- ${item.value}`).join('\n');
    const prompt = promptFormat(choices, selectType);

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

      setResult(jsonMessage.選択結果);
      setResultReason(jsonMessage.理由);
      setSelected(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = useCallback(() => {
    setSelected(false);
    setResult('');
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
              <Result result={result} resultReason={resultReason} />
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
