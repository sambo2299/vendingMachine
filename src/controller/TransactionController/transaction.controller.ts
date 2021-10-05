import * as transactionModel from "../../models/transaction/transaction.model";

export const getAllTranaction = async (req: any, res: any) => {
  const transactions = await transactionModel.getAll();
  res.status(500).send({
    message: 'All transaction fetched',
    transactions
  })
}