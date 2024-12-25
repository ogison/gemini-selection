import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Item } from '../types';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { AlignJustify, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Props {
  item: Item;
  id: string;
  index: number;
  remove: (index: number | number[]) => void;
}

const DraggableRow = (props: Props) => {
  const { item, id, index, remove } = props;
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id });

  return (
    <div
      key={id}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
    >
      <FormField
        name={`items.${index}.value`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center space-x-2" key={item.id}>
                <AlignJustify {...listeners} />
                <Input
                  aria-label={`選択肢 ${index + 1}`}
                  className="grow"
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={`選択肢 ${index + 1}`}
                  type="text"
                  value={field.value}
                />
                <Button
                  aria-label={`選択肢 ${index + 1} を削除`}
                  className="shrink-0"
                  onClick={() => remove(index)}
                  size="icon"
                  type="button"
                  variant="destructive"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DraggableRow;
