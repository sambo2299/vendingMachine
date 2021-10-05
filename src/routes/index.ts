import BalanceRouter from '../controller/BalanceController';
import ItemRouter from '../controller/ItemsController';
import StockRouter from '../controller/StockController';

const routes = (app: any) => {
  app.use('/api/balance', BalanceRouter)
  app.use('/api/items', ItemRouter)  
  app.use('/api/stocks', StockRouter)  
}

export default routes;
