import { Label } from '@radix-ui/react-label';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppContext } from '../context/AppContext';

export const SelectForm = () => {
  const { items, setItems } = useAppContext();

  const updateItem = (id: number, value: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, value } : item)));
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-2">
      <Label className="whitespace-nowrap">選択肢：</Label>
      {items.map((item, index) => (
        <div className="flex items-center space-x-2" key={item.id}>
          <Input
            aria-label={`選択肢 ${index + 1}`}
            className="grow"
            onChange={(e) => updateItem(item.id, e.target.value)}
            placeholder={`選択肢 ${index + 1}`}
            type="text"
            value={item.value}
          />
          <Button
            aria-label={`選択肢 ${index + 1} を削除`}
            className="shrink-0"
            onClick={() => deleteItem(item.id)}
            size="icon"
            type="button"
            variant="destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};
