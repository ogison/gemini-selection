"use client";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, PlusCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CardContent } from "@/components/ui/card";
import { Item } from "../../types";
import { SelectForm } from "./select-form";

interface Props {
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  selected: boolean;
  result: string | undefined;
  resultReason: string | undefined;
}

export const ContentForm = ({
  items,
  setItems,
  handleSubmit,
  isLoading,
  selected,
  result,
  resultReason,
}: Props) => {
  const addItem = () => {
    const newId =
      items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    setItems([...items, { id: newId, value: "" }]);
  };

  return (
    <CardContent>
      {!selected ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <SelectForm items={items} setItems={setItems} />
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
              disabled={
                isLoading ||
                items.filter((item) => item.value.trim() !== "").length < 2
              }
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
            {resultReason}
          </AlertDescription>
        </Alert>
      )}
    </CardContent>
  );
};
