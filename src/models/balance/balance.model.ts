import {Balance} from './balance.interface';

const balance: Balance = {
  current_balance: 100,
  initial_balance: 100,
  last_transaction: null,
}

  export const add = async(amount: number): Promise<number> => {
    balance.current_balance = balance.current_balance + amount;
    balance.last_transaction = new Date();
    return balance.current_balance;
  }

  export const get = async(): Promise<number> => {
    return balance.current_balance;
  }

  export const subtract = async (amount: number) : Promise<number> => {
    balance.current_balance = balance.current_balance - amount;
    balance.last_transaction = new Date();
    return balance.current_balance;
  }