import { UseFormReturn } from 'react-hook-form';
import { FormSchemaType, Item, ResultType } from '../types';
import { t } from 'i18next';

export const promptFormat = (form: UseFormReturn<FormSchemaType>) => {
  const items = form.getValues('items');
  const type = form.getValues('type');
  const bias = form.getValues('bias');

  const choices = items.map((item) => `- ${item.value}`).join('\n');
  let prompt = `
          ### ${t('CHOICES')}
          ${choices}
  
          ### ${t('OUTPUT_FORMAT_TITLE')}
          ${t('OUTPUT_FORMAT_DESCRIPTION1')}
          ${t('OUTPUT_FORMAT_DESCRIPTION2')}
  
          ### ${t('INSTRUCTION_TITLE')}
          {
            ${t('INSTRUCTION_DESCRIPTION1')}
            ${t('INSTRUCTION_DESCRIPTION2')}
          }
          `.trim();

  if (bias && bias.trim() !== '') {
    prompt =
      prompt +
      `
        ### ${t('SELECTION_BIAS')}
        ${bias}
      `.trim();
  }

  if (type && type.trim() !== '') {
    prompt =
      prompt +
      `
          ### ${t('THEME')}
          ${type}
        `.trim();
  }

  return prompt;
};

export const makeText = (items: Item[], type: string | undefined, bias: string | undefined, result: ResultType) => {
  const choices = items.map((item) => `・ ${item.value}`).join('\n');
  let text = `### ${t('CHOICES')}
${choices}

### ${t('RESULT_TITLE')}
${result.selection}

### ${t('REASON')}
${result.reason}
`.trim();

  if (bias && bias.trim() !== '') {
    text = `### ${t('SELECTION_BIAS')}
${bias}

${text}
`.trim();
  }

  if (type && type.trim() !== '') {
    text = `### ${t('THEME')}
${type}

${text}
`.trim();
  }

  return text;
};
