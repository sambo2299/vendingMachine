import { Transaction } from './transaction.interface';

const transactions: Transaction[] =
[
  {
    "id": new Date().getTime(),
    "balance": 100,
    "type": "dr",
    "remarks": "initial capital",
    "date": null,
    "payment_mode": null,
    "received_amount": null,
    "return_amount": null
  }
]

  export const getAll = async(): Promise<Transaction[]> => {
    return transactions;
  }

  export const add = async(obj: Transaction): Promise<boolean> => {
    await transactions.push(obj);
    return true;
  }