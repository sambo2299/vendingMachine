import { Router } from "express";

import * as BalanceController from "./balance.controller";

const BalanceRouter = Router();

  BalanceRouter
  .route('/')
  .get(BalanceController.getBalance)
  .put(BalanceController.addBalance)

export default BalanceRouter;
