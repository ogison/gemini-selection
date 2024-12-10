"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Item } from "../types";

type AppContextType = {
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
  selectType: string | undefined;
  setSelectType: Dispatch<SetStateAction<string | undefined>>;
};

// Contextを作成
const AppContext = createContext<AppContextType | undefined>(undefined);

// Providerを作成
export const AppProvider = ({ children }: { children: ReactNode }) => {
  // 入力Formを管理
  const [items, setItems] = useState<Item[]>([{ id: 1, value: "" }]);
  const [selectType, setSelectType] = useState<string>();

  const value: AppContextType = {
    items,
    setItems,
    selectType,
    setSelectType,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// カスタムフック: useAppContext
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
