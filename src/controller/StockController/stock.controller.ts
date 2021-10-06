import * as StockModel from "../../models/stock/stock.model";

export const getAllStocks = async(req: any, res: any) => {
  const Items = await StockModel.getAll();
  if(!Items || !Items.length){
    return res.status(500).send({
      message: 'stock not found'
    })
  }
  res.status(200).send({
    message: 'All items stock fetched',
    Items
  })
};

export const getOneItemStock = async(req: any, res: any) => {
  console.log('get one item stock')
  const itemCode = req.params.itemCode
  const Item = await StockModel.getOne(itemCode);
  if(!Item) {
    return res.status(500).send({
      message: 'stock not found'
    })
  }
  res.status(200).send({
    message: 'item stock fetched',
    Item
  })
};

export const updateItemStock = async(req: any, res: any) => {
  console.log(req.params)
  if(!req.params.itemCode || !req.params.actions) {
    return res.status(500).send({
      message: 'not enough params'
    });
  }
  const actions = ['add', 'remove'];
  if(actions.indexOf(req.params.actions) < 0) {
    return res.status(500).send({
      message: `action ${req.params.actions} not permitted!!!`
    })
  }
  const itemCode = req.params.itemCode
  let Item = {};
  switch(req.params.actions){
    case "add":
      Item = await StockModel.add(itemCode);
      break;
    case "remove":
      Item = await StockModel.subtract(itemCode);
      break;
    default:
      res.status(500).send({
        message: 'internal server error!!!'
      })
  }
  if(!Item) {
    return res.status(500).send({
      message: 'Item not found'
    })
  }
  res.status(200).send({
    message: 'Item  stock updated',
    Item
  })
}