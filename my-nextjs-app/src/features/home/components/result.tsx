import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, CheckCircle2, Copy } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { makeText } from '../utils/prompt';

interface Props {
  result: string;
  resultReason: string;
}

export const Result = (props: Props) => {
  const { result, resultReason } = props;
  const { items, selectType } = useAppContext();
  const [copied, setCopied] = useState<boolean>(false);

  const copyText = async () => {
    const textToCopy = makeText(items, selectType, result, resultReason);
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Alert>
      <CheckCircle2 className="size-4" />
      <AlertTitle>選択結果 {result}</AlertTitle>
      <AlertDescription className="mt-4 text-lg font-semibold">{resultReason}</AlertDescription>
      <Button
        size="icon"
        variant="ghost"
        className={cn('absolute right-2 top-2 size-8 hover:bg-muted', copied && 'text-green-500')}
        onClick={copyText}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        <span className="sr-only">結果をコピー</span>
      </Button>
    </Alert>
  );
};
