import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import { useAppContext } from '@/app/context/AppContext';

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
        <div key={item.id} className="flex items-center space-x-2">
          <Input
            type="text"
            value={item.value}
            onChange={(e) => updateItem(item.id, e.target.value)}
            placeholder={`選択肢 ${index + 1}`}
            aria-label={`選択肢 ${index + 1}`}
            className="flex-grow"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => deleteItem(item.id)}
            aria-label={`選択肢 ${index + 1} を削除`}
            className="flex-shrink-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};
