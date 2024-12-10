'use client';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { useAppContext } from '@/app/context/AppContext';

import { COOKIES_KEY, promptFormat } from '../../constants';
import { Item } from '../../types';

import { ContentForm } from './content-form';

export const InputForm = () => {
  const { items, setItems, selectType, setSelectType } = useAppContext();
  const [selected, setSelected] = useState<boolean>(false);
  const [result, setResult] = useState<string>();
  const [resultReason, setResultReason] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingContent, setIsLoadingContent] = useState<boolean>(true);

  // Cookieからデータを取得する
  useEffect(() => {
    const loadDataFromCookies = async () => {
      try {
        const savedItems = Cookies.get(COOKIES_KEY.FORM_ITEMS);
        if (savedItems) {
          const parsedItems = JSON.parse(savedItems) as Item[];
          setItems(parsedItems);
        }

        const savedType = Cookies.get(COOKIES_KEY.FORM_TYPE);
        if (savedType) {
          const parsedItems = JSON.parse(savedType) as string;
          setSelectType(parsedItems);
        }
      } catch (error) {
        console.error('Failed to parse cookies', error);
      } finally {
        setIsLoadingContent(false);
      }
    };

    loadDataFromCookies();
  }, []);

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
      const response = await fetch('/api/gemini-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelected(false);
    setResult('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center from-blue-100 to-blue-200 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">選択アプリ</CardTitle>
          <CardDescription className="text-center">
            {selected ? '結果' : 'AIに選んでもらいたいものを入力してください'}
          </CardDescription>
        </CardHeader>
        {isLoadingContent ? (
          <div className="flex items-center justify-center">
            <div>Loading...</div>
          </div>
        ) : (
          <ContentForm
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            result={result}
            resultReason={resultReason}
            selected={selected}
          />
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
