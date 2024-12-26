import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { t } from 'i18next';

interface Props {
  selected: boolean;
}

export const CardHeaderComponent = (props: Props) => {
  const { selected } = props;
  return (
    <CardHeader>
      <CardTitle className="text-center text-2xl font-bold">選択アプリ</CardTitle>
      <CardDescription className="text-center">{selected ? t('RESULT') : t('SELECTION')}</CardDescription>
    </CardHeader>
  );
};
