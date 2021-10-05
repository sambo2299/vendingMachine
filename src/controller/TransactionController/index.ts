import { Router } from "express";

import * as TransactionController from "./transaction.controller";

const BalanceRouter = Router();

  BalanceRouter
  .route('/')
  .get(TransactionController.getAllTranaction)  

export default BalanceRouter;
