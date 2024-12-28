import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { Language } from '../types';
import { useTranslation } from 'react-i18next';

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
  };

  const handleToggleLanguage = () => {
    const nextLanguage = i18n.language === 'ja' ? 'en' : 'ja';
    changeLanguage(nextLanguage);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 flex items-center gap-2"
      onClick={handleToggleLanguage}
    >
      <Languages className="h-4 w-4" />
      <span>{i18n.language === 'ja' ? 'English' : '日本語'}</span>
    </Button>
  );
}
