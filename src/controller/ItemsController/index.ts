import { Router } from "express";

import * as ItemController from "./items.controller";

const ItemRouter = Router();

  ItemRouter
  .route('/')
  .get(ItemController.getAllItems)
  
  ItemRouter.
  route('/:itemCode')
  .get(ItemController.getOneItem)  

export default ItemRouter;
