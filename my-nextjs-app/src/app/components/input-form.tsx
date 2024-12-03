"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Item } from "../types";

export default function InputForm() {
  const [items, setItems] = useState<Item[]>([{ id: 1, value: "" }]);

  const addItem = () => {
    const newId =
      items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    setItems([...items, { id: newId, value: "" }]);
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: number, value: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, value } : item)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("送信されたデータ:", items);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">選択肢を入力してください</h1>
      {items.map((item, index) => (
        <div key={item.id} className="flex items-center space-x-2">
          <Input
            type="text"
            value={item.value}
            onChange={(e) => updateItem(item.id, e.target.value)}
            placeholder={`項目 ${index + 1}`}
            aria-label={`項目 ${index + 1}`}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => deleteItem(item.id)}
            aria-label={`項目 ${index + 1} を削除`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addItem} className="mt-2">
        項目を追加
      </Button>
      <Button type="submit" className="mt-4">
        送信
      </Button>
    </form>
  );
}
