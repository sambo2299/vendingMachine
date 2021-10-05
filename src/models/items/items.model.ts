import {Items} from './items.interface';

let items: Items[] = [
  {
    code: 'sd101',
    name: "Coke",
    cost: 20,
    description: "cocacola soft drink"
  },
  {
    code: 'sd102',
    name: "Pepsi",
    cost: 25,
    description: "Pepsi soft drink"
  },
  {
    code: 'sd102',
    name: "Dew",
    cost: 30,
    description: "Dew soft drink"
  }
]

  export const getAll = async(): Promise<Items[]> => {
    return items;
  }

  export const getOne = async(code: any): Promise<Items> => {
    const itm: Items = await items.find(i => i.code === code);
    return itm;
  }