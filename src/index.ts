import logger from "./system/logger";

import express from "express";
import * as bodyParser from 'body-parser';
import path from 'path';
import {renderFile} from 'ejs';

import routes from './routes';

const app = express();
app.use(express.static(path.resolve(__dirname, '../client/assets')));
app.set('views', path.resolve(__dirname, '../client/views'));
app.engine('html', renderFile);
app.set('view engine', 'html');

const port = process.env.PORT || 8080;

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
    logger.info(`server started at http://localhost:${ port }`)
} );