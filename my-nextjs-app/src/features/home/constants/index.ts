export const promptFormat = (choices: string, type: string | undefined) => {
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

export const COOKIES_KEY = {
  FORM_ITEMS: 'formItems',
  FORM_TYPE: 'formType',
};
