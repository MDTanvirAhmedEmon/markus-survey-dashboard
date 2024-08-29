import axios from 'axios';

const translateText = async (text, targetLanguage, apiKey) => {
  const url = `https://translation.googleapis.com/language/translate/v2`;
  try {
    const response = await axios.post(url, null, {
      params: {
        q: text,
        target: targetLanguage,
        key: apiKey,
      },
    });
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    return null;
  }
};

export default translateText;
