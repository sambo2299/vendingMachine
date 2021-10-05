import * as ItemModel from "../../models/items/items.model";

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