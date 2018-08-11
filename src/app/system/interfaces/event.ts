export interface IEvent {
  type: string;
  amount: number;
  category: number;
  date: string;
  description: string;
  id?: string;
  categoryName?: string;
}
