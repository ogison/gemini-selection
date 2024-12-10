'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-red-600">エラーが発生しました</CardTitle>
          <CardDescription className="text-center">申し訳ありませんが、問題が発生しました。</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">{error.message || 'エラーの詳細は不明です。'}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={reset} variant="outline">
            もう一度試す
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
