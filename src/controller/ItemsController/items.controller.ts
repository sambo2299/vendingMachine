import logger from '../../system/logger';

import * as ItemModel from "../../models/items/items.model";
import * as StockModel from "../../models/stock/stock.model";
import * as BalanceModel from "../../models/balance/balance.model";
import * as TransactionModel from "../../models/transaction/transaction.model";
import {Transaction} from "../../models/transaction/transaction.interface";

export const getAllItems = async(req: any, res: any) => {
  const Items = await ItemModel.getAll();
  if(!Items || !Items.length){
    return res.status(500).send({
      message: 'Items not found'
    })
  }
  res.status(200).send({
    message: 'All items fetched',
    Items
  })
};

export const getOneItem = async(req: any, res: any) => {
  const itemCode = req.params.itemCode
  const Item = await ItemModel.getOne(itemCode);
  if(!Item) {
    return res.status(500).send({
      message: 'Item not found'
    })
  }
  res.status(200).send({
    message: 'Item fetched',
    Item
  })
};

export const refundItem = async(req: any, res: any) => {
  const itemCode = req.params.type;
  if(!itemCode){
    return res.status(500).send({
      message: 'item must be specified'
    })
  }
  const item = await ItemModel.getOne(itemCode);
  if(!item){
    return res.status(500).send({
      message: 'item not avaialble'
    })
  }
  const balanceAmount = await BalanceModel.get();
  if(balanceAmount < item.cost) {
    return res.status(500).send({
      message: 'Balance not sufficient for refund'
    })
  }
  try {
    const stockOperations = await StockModel.add(itemCode);
    const balanceOperations = await BalanceModel.subtract(item.cost);
    const newtranaction: Transaction = {
      id: new Date().getTime(),
      balance: balanceOperations,
      type: 'cr',
      date: new Date(),
      payment_mode: req.body.payment_mode || null,
      received_amount: null,
      return_amount: item.cost,
      remarks: `${item.name} refund`
    };
    const transactionOperations = await TransactionModel.add(newtranaction);
    return res.status(200).send({
      message: `you refunded an item ${item.name}`,
      refundedAmound: item.cost
    });
  }catch(ex) {
    logger.error(ex);
    return res.status(500).send({
      message: 'internal server error'
    });
  }
}

export const buyItem = async(req: any, res: any) => {
  const itemCode = req.params.type;
  if(!itemCode){
    return res.status(500).send({
      message: 'item must be specified'
    })
  }
  const item = await ItemModel.getOne(itemCode);
  if(!item){
    return res.status(500).send({
      message: 'item not avaialble'
    })
  }
  const stockItem = await StockModel.getOne(itemCode);
  if(!stockItem || stockItem.item_stock < 1) {
    return res.status(500).send({
      message: `Item ${item.name} is out of stock`
    })
  }
  if(!req.body || !req.body.amount){
    return res.status(500).send({
      message: 'Amount must be sent!!!'
    })
  }
  const amountReceived = Number(req.body.amount);
  if(item.cost > amountReceived) {
    return res.status(500).send({
      message: 'Item cost is more than amount received'
    })
  }
  const balanceAmount = await BalanceModel.get();
  // if(balanceAmount  < (amountReceived - item.cost)) {
  //   return res.status(500).send({
  //     message: 'Balance not sufficient for returning amount'
  //   })
  // }
  const returnAmount = amountReceived - item.cost;
  try {
    const stockOperations = await StockModel.subtract(itemCode);
    const balanceOperations = await BalanceModel.add(item.cost);
    const newtranaction: Transaction = {
      id: new Date().getTime(),
      balance: balanceOperations,
      type: 'dr',
      date: new Date(),
      payment_mode: req.body.payment_mode || null,
      received_amount: amountReceived,
      return_amount: returnAmount,
      remarks: `${item.name} buy`
    };
    const transactionOperations = await TransactionModel.add(newtranaction);
    return res.status(200).send({
      message: `here is you item ${item.name}`,
      amountReceived,
      returnAmount,
    });
  }catch(ex) {
    logger.error(ex);
    return res.status(500).send({
      message: 'internal server error'
    });
  }
}