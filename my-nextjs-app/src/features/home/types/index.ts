export interface Item {
  id: number;
  value: string;
}

export interface Form {
  items: Item[];
  type: string;
}
