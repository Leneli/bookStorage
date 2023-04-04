const express = require('express');
const app = express();

const config = require('../../config');

const {mainRouter, apiRouter} = require('../routes');
const endpoints = require('../constants/endpoints');

const {errorHandler, logger} = require('../middleware');

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
app.use(express.static(config.css_folder));
app.set('view engine', 'ejs');

/**
 * Routes
 */
app.use(endpoints.MAIN, mainRouter);
app.use(endpoints.API, apiRouter);

/**
 * Error handler
 */
app.use(errorHandler);

module.exports = app;
