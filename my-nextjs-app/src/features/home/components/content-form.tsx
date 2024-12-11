'use client';
import { Loader2, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { SelectForm } from './select-form';
import { useAppContext } from '../context/AppContext';

interface Props {
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

export const ContentForm = ({ handleSubmit, isLoading }: Props) => {
  const { items, setItems, selectType, setSelectType } = useAppContext();

  const addItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    setItems([...items, { id: newId, value: '' }]);
  };

  return (
    <form className="space-y-4" onSubmit={(e) => void handleSubmit(e)}>
      <div className="space-y-2">
        <Label className="whitespace-nowrap">何を選ぶか：</Label>
        <Input
          key="selectType"
          onChange={(e) => setSelectType(e.target.value)}
          placeholder="例：幹事、旅行先、プレゼント"
          value={selectType ?? ''}
        />
      </div>

      <SelectForm />
      <div className="flex items-center justify-between pt-4">
        <Button className="mr-2 w-full" onClick={addItem} type="button" variant="outline">
          <PlusCircle className="mr-2 size-4" />
          選択肢を追加
        </Button>
        <Button
          className="ml-2 w-full"
          disabled={isLoading || items.filter((item) => item.value.trim() !== '').length < 2}
          type="submit"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              選択中...
            </>
          ) : (
            '選択する'
          )}
        </Button>
      </div>
    </form>
  );
};
