import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Item } from '../types';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface Props {
  fields: Item[];
  remove: (index: number | number[]) => void;
}

export const ChoicesComponent = (props: Props) => {
  const { fields, remove } = props;
  return (
    <>
      <FormLabel>選択肢（必須）：</FormLabel>
      {fields.map((item, index) => (
        <div key={item.id}>
          <FormField
            name={`items.${index}.value`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2" key={item.id}>
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
      ))}
    </>
  );
};
