'use client';
import React, { createContext, useContext, ReactNode } from 'react';

import { FormSchemaType } from '../types';
import { useForm, UseFormReturn } from 'react-hook-form';

type AppContextType = {
  form: UseFormReturn<FormSchemaType>;
};

// Contextを作成
const AppContext = createContext<AppContextType | undefined>(undefined);

// Providerを作成
export const AppProvider = ({ children }: { children: ReactNode }) => {
  // 入力Formを管理
  const form = useForm<FormSchemaType>({
    defaultValues: {
      type: '',
      items: [{ id: 1, value: '' }],
    },
  });

  const value: AppContextType = {
    form,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// カスタムフック: useAppContext
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
