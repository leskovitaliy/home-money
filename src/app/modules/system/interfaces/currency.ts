export interface ICurrency {
  base: string;
  date: string;
  rates: IRates;
  success: boolean;
  timestamp: number;
}

export interface IRates {
  UAH: string;
  USD: string;
  EUR: string;
}
