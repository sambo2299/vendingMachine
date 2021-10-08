import { Router } from "express";

import * as stockController from "./stock.controller";

const StockRouter = Router();

  StockRouter
  .route('/')
  .get(stockController.getAllStocks)

  StockRouter.
  route('/:itemCode/:actions?')
  .get(stockController.getOneItemStock)
  // .put(stockController.updateItemStock)

export default StockRouter;
