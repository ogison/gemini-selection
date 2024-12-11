import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  result: string | undefined;
  resultReason: string | undefined;
}

export const Result = (props: Props) => {
  const { result, resultReason } = props;
  return (
    <Alert>
      <CheckCircle2 className="size-4" />
      <AlertTitle>選択結果 {result}</AlertTitle>
      <AlertDescription className="text-lg font-semibold">{resultReason}</AlertDescription>
    </Alert>
  );
};
