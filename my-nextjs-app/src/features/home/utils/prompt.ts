import { Item, ResultType } from '../types';

export const promptFormat = (items: Item[], type: string | undefined) => {
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

export const makeText = (items: Item[], type: string | undefined, result: ResultType) => {
  const choices = items.map((item) => `・ ${item.value}`).join('\n');
  let text = `### 選択肢
${choices}

### 選択結果
${result.selection}

### 理由
${result.reason}
`.trim();
  if (type && type.trim() !== '') {
    text = `### テーマ
${type}

${text}
`.trim();
  }

  return text;
};
