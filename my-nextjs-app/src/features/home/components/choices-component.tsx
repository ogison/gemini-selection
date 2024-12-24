import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Item } from '../types';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface Props {
  fields: Item[];
  remove: (index: number | number[]) => void;
  move: (from: number, to: number) => void;
}

export const ChoicesComponent = (props: Props) => {
  const { fields, remove, move } = props;

  // ドラッグ終了時に順番を更新する
  const handleDragEnd = (result: any) => {
    console.log('aaaaa', result);
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  return (
    <>
      <FormLabel>選択肢（必須）：</FormLabel>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="fields" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="relative overflow-visible">
              {fields.map((item, index) => (
                <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} style={provided.draggableProps.style}>
                      <FormField
                        name={`items.${index}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <div {...provided.dragHandleProps} className="cursor-grab">
                                  <span>☰</span>
                                </div>
                                <Input
                                  aria-label={`選択肢 ${index + 1}`}
                                  className="grow"
                                  onChange={(e) => {
                                    field.onChange(e.target.value), console.log(fields);
                                  }}
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
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
