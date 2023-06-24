import express from 'express';

import {CONFIG} from '../config';
import {ENDPOINTS} from '../constants';
import {apiRouter, mainRouter} from '../routes';
import {errorHandler, logger} from '../middleware';

const app = express();

/**
 * JSON parse
 */
app.use(express.json());

/**
 * Logger
 */
app.use(logger);

/**
 * View (ejs)
 */
app.use(express.urlencoded());
app.use(express.static(CONFIG.css_folder));
app.set('view engine', 'ejs');

/**
 * Routes
 */
app.use(ENDPOINTS.MAIN, mainRouter);
app.use(ENDPOINTS.API, apiRouter);

/**
 * Error handler
 */
app.use(errorHandler);

export {app};
