'use client';
import { Loader2, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useAppContext } from '../context/AppContext';
import { useFieldArray, useWatch } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { InputForm } from '@/components/form-input';
import { FormSchemaType } from '../types';
import { ChoicesComponent } from './choices-component';
import { t } from 'i18next';

interface Props {
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}

export const ContentForm = ({ handleSubmit, isLoading }: Props) => {
  const { form } = useAppContext();

  const { fields, append, remove, move } = useFieldArray({
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
          <InputForm<FormSchemaType>
            control={form.control}
            name="type"
            label={t('SELECTION_TYPE')}
            placeholder={t('TYPE_PLACEHOLDER')}
          />
        </div>

        <div className="space-y-2">
          <InputForm<FormSchemaType>
            control={form.control}
            name="bias"
            label={t('SELECTION_BIAS')}
            placeholder={t('BIAS_PLACEHOLDER')}
          />
        </div>

        <div className="space-y-2">
          <ChoicesComponent fields={fields} remove={remove} move={move} />
        </div>
        <div className="flex items-center justify-between pt-4">
          <Button className="mr-2 w-full" onClick={addItem} type="button" variant="outline">
            <PlusCircle className="mr-2 size-4" />
            {t('ADD_OPTION')}
          </Button>
          <Button
            className="ml-2 w-full"
            disabled={isLoading || items.filter((item) => item.value.trim() !== '').length < 2}
            type="submit"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                {t('SELECTING')}
              </>
            ) : (
              t('SELECT_BUTTON')
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
