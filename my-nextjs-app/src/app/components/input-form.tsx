"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, PlusCircle, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Item } from "../types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function InputForm() {
  const [items, setItems] = useState<Item[]>([{ id: 1, value: "" }]);
  const [selected, setSelected] = useState<boolean>(false);
  const [result, setResult] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSelected(true);
    setIsLoading(true);
    const prompt: string = items.map((item) => item.value).join(", ");
    try {
      const response = await fetch("/api/gemini-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt_post: prompt }), //promptに入力する文字を入れる
      });
      const data = await response.json();
      setResult(data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelected(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            選択アプリ
          </CardTitle>
          <CardDescription className="text-center">
            {selected ? "選択結果" : "選択肢を入力してください"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!selected ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Input
                      type="text"
                      value={item.value}
                      onChange={(e) => updateItem(item.id, e.target.value)}
                      placeholder={`選択肢 ${index + 1}`}
                      aria-label={`選択肢 ${index + 1}`}
                      className="flex-grow"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteItem(item.id)}
                      aria-label={`選択肢 ${index + 1} を削除`}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-4">
                <Button
                  type="button"
                  onClick={addItem}
                  variant="outline"
                  className="w-full mr-2"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  選択肢を追加
                </Button>
                <Button
                  type="submit"
                  className="w-full ml-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      選択中...
                    </>
                  ) : (
                    "選択する"
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>選択結果 {result}</AlertTitle>
              <AlertDescription className="text-lg font-semibold">
                {selected}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {selected && (
            <Button onClick={handleReset} variant="outline">
              もう一度選ぶ
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
