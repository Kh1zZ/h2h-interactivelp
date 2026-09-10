import { en } from './en';
import { id } from './id';
import { Language } from '@/context/LanguageContext';

export const translations = {
  en,
  id,
};

export const getTranslation = (lang: Language) => {
  return translations[lang] || translations.en;
};

export { en, id };
