import React from 'react';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { FormLabel } from '@/components/ui/form';
import { Item } from '../types';
import DraggableRow from './choices-row';

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

  return (
    <>
      <FormLabel>選択肢（必須）：</FormLabel>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={fields}>
          {fields.map((item, index) => (
            <DraggableRow key={item.id} item={item} id={item.id.toString()} index={index} remove={remove} />
          ))}
        </SortableContext>
      </DndContext>
    </>
  );
};
