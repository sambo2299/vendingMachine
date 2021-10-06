import logger from "./system/logger";

import express from "express";
import * as bodyParser from 'body-parser';
import path from 'path';
import {renderFile} from 'ejs';
import cors from 'cors';

import routes from './routes';

const app = express();
app.use(express.static(path.resolve(__dirname, '../client/vending-machine/build')));
app.set('views', path.resolve(__dirname, '../client/vending-machine/build'));
app.engine('html', renderFile);
app.set('view engine', 'html');
app.use(cors({origin: "*"}));

const port = process.env.PORT || 8080;

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
    logger.info(`server started at http://localhost:${ port }`)
} );