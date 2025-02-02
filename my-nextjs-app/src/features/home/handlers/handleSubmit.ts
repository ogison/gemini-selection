import { UseFormReturn } from 'react-hook-form';
import { fetchData } from '../api/fetchData';
import { FormSchemaType, ResultType } from '../types';
import { setCookies } from '../utils/cookies';
import { promptFormat } from '../utils/prompt';
import { t } from 'i18next';

export const handleSubmit = async (
  e: React.FormEvent,
  form: UseFormReturn<FormSchemaType>,
  setIsLoading: (loading: boolean) => void,
  setSelected: (selected: boolean) => void,
  setResult: (result: ResultType) => void,
) => {
  e.preventDefault();
  // Cookieに入力した選択肢を保存
  setCookies(form);
  setIsLoading(true);

  const prompt = promptFormat(form);
  const resultTitle = t('RESULT_TITLE');
  const reason = t('REASON');

  try {
    const data = await fetchData(prompt);
    const message = data.message.replace(/```json|```/g, '').trim();
    try {
      const jsonMessage = JSON.parse(message);

      setResult({ selection: jsonMessage[resultTitle], reason: jsonMessage[reason] });
      setSelected(true);
    } catch (error) {
      console.error('JSON parsing failed:', error);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setIsLoading(false);
  }
};
