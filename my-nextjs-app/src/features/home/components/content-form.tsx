'use client';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useAppContext } from '../context/AppContext';
import { useFieldArray, useWatch } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface Props {
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

export const ContentForm = ({ handleSubmit, isLoading }: Props) => {
  const { form } = useAppContext();

  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control: form.control,
  });

  const items = useWatch({
    name: 'items',
    control: form.control,
  });

  const addItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    append({ id: newId, value: '' });
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={(e) => void handleSubmit(e)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>何を選ぶか：</FormLabel>
                <FormControl>
                  <Input
                    key="selectType"
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder="例：幹事、旅行先、プレゼント"
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormLabel>選択肢：</FormLabel>
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
        </div>
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
    </Form>
  );
};
