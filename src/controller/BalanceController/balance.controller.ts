import * as balanceModel from "../../models/balance/balance.model";

export const getBalance = async(req:any, res:any) => {
  const balance = await balanceModel.get();
  res.status(200).send({
    balance,
    message: 'current balance fetched'
  });
};
export const addBalance = async(req:any, res:any) => {
  const balance = await balanceModel.add(25);
  res.status(200).send({
    balance,
    message: 'current balance fetched'
  });
};