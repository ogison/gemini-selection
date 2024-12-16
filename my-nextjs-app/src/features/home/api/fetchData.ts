import { API_ENDPOINT, HEADERS } from '../constants';

export const fetchData = async (prompt: string) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ prompt_post: prompt }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in fetchData:', error);
    throw error;
  }
};
