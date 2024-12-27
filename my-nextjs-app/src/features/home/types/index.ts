import { z } from 'zod';

export interface Item {
  id: number;
  value: string;
}

export interface FormType {
  type: string;
  items: Item[];
}

export interface ResultType {
  selection: string;
  reason: string;
}

export const itemSchema = z.object({
  id: z.number().int().positive(),
  value: z.string(),
});

export const formSchema = z.object({
  type: z.string(),
  bias: z.string(),
  items: z.array(itemSchema),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export type Language = 'ja' | 'en';
