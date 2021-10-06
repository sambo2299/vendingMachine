import { Stock } from './stock.interface';

const stocks: Stock[] =[
  {
    item_code: 'sd101',
    item_stock: 10
  },
  {
    item_code: 'sd102',
    item_stock: 10
  },
  {
    item_code: 'sd103',
    item_stock: 10
  }
]

  export const getAll = async(): Promise<Stock[]> => {
    return stocks;
  }

  export const getOne = async(code: any): Promise<Stock> => {
    const itm: Stock = await stocks.find(i => i.item_code === code);
    return itm;
  }

  export const add = async(code: any): Promise<Stock> => {
    const itm: Stock = await stocks.find(i => i.item_code === code);
    itm.item_stock += 1;
    return itm;
  }

  export const subtract = async(code: any): Promise<Stock> => {
    const itm: Stock = await stocks.find(i => i.item_code === code);
    itm.item_stock -= 1;
    return itm;
  }