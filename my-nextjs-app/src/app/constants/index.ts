export const promptFormat = (choices: string) => {
  return `
        ### 選択肢
        ${choices}

        ### 指令
        選択肢から最もふさわしい人物を選んでください
        あなたの偏見と独断で選択して、その理由も述べてください

        ### 出力形式
        {
          "選択結果": "{選んだ選択肢}",
          "理由": "{選んだ理由}"
        }
        `.trim();
};
