import BalanceRouter from '../controller/BalanceController';
import ItemRouter from '../controller/ItemsController';
import StockRouter from '../controller/StockController';
import TransactionRouter from '../controller/TransactionController'
import { render } from 'ejs';

const routes = (app: any) => {
  app.use('/api/balance', BalanceRouter)
  app.use('/api/items', ItemRouter)
  app.use('/api/stocks', StockRouter)
  app.use('/api/transaction', TransactionRouter)

  app.get('/', (req:any, res:any) => {
    res.render('index')
  })
}

export default routes;
