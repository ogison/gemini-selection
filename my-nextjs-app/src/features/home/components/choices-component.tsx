import React from 'react';
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { FormLabel } from '@/components/ui/form';
import { Item } from '../types';
import DraggableRow from './choices-row';
import { t } from 'i18next';

interface Props {
  fields: Item[];
  remove: (index: number | number[]) => void;
  move: (from: number, to: number) => void;
}

export const ChoicesComponent = (props: Props) => {
  const { fields, remove, move } = props;

  const handleDragEnd = (result: any) => {
    if (!result.over) return;
    move(result.active.data.current.sortable.index, result.over.data.current.sortable.index);
  };

  // スマホとPCの両操作で可能に
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  return (
    <>
      <FormLabel>
        {t('CHOICES')}
        {t('REQUIRED')}
      </FormLabel>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={fields}>
          {fields.map((item, index) => (
            <DraggableRow key={item.id} item={item} id={item.id.toString()} index={index} remove={remove} />
          ))}
        </SortableContext>
      </DndContext>
    </>
  );
};
