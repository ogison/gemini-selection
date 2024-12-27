import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { Language } from '../types';

interface LanguageToggleProps {
  currentLanguage: Language;
  onToggle: () => void;
}

export function LanguageToggle({ currentLanguage, onToggle }: LanguageToggleProps) {
  return (
    <Button variant="outline" size="sm" className="fixed top-4 right-4 flex items-center gap-2" onClick={onToggle}>
      <Languages className="h-4 w-4" />
      <span>{currentLanguage === 'ja' ? 'English' : '日本語'}</span>
    </Button>
  );
}
