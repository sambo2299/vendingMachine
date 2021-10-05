import express from "express";
import * as bodyParser from 'body-parser';

import logger from "./system/logger";

const app = express();
const port = 8080;
import routes from './routes';

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
    logger.info(`server started at http://localhost:${ port }`)
} );