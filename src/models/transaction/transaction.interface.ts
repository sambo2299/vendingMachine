export interface Transaction {
  id: number,
  balance: number;
  type: string;
  remarks: string;
  date: Date;
  payment_mode: string;
  received_amount: number;
  return_amount: number;
}