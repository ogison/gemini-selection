import { UseFormReturn } from 'react-hook-form';
import { FormSchemaType, Item, ResultType } from '../types';

export const promptFormat = (form: UseFormReturn<FormSchemaType>) => {
  const items = form.getValues('items');
  const type = form.getValues('type');
  const bias = form.getValues('bias');

  const choices = items.map((item) => `- ${item.value}`).join('\n');
  let prompt = `
          ### 選択肢
          ${choices}
  
          ### 指令
          最もふさわしいを選択肢選んでください
          あなたの偏見と独断で選択して、その理由も述べてください
  
          ### 出力形式
          {
            "選択結果": "{選んだ選択肢}",
            "理由": "{選んだ理由}"
          }
          `.trim();

  if (bias && bias.trim() !== '') {
    prompt =
      prompt +
      `
        ### 前提条件
        ${bias}
      `.trim();
  }

  if (type && type.trim() !== '') {
    prompt =
      prompt +
      `
          ### テーマ
          ${type}
        `.trim();
  }

  return prompt;
};

export const makeText = (items: Item[], type: string | undefined, bias: string | undefined, result: ResultType) => {
  const choices = items.map((item) => `・ ${item.value}`).join('\n');
  let text = `### 選択肢
${choices}

### 選択結果
${result.selection}

### 理由
${result.reason}
`.trim();

  if (bias && bias.trim() !== '') {
    text = `### 前提条件
${bias}

${text}
`.trim();
  }

  if (type && type.trim() !== '') {
    text = `### テーマ
${type}

${text}
`.trim();
  }

  return text;
};
