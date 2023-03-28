const express = require('express');
const app = express();

const {mainRouter, apiRouter} = require('../routes');
const endpoints = require('../constants/endpoints');

// const {errorHandler} = require('../middlewares/errorHandler');

/**
 * JSON parse
 */
app.use(express.json());

/**
 * Logger
 */
// logger

/**
 * Routes
 */
app.use(endpoints.MAIN, mainRouter);
app.use(endpoints.API, apiRouter);

/**
 * Error handler
 */
// app.use(errorHandler);

module.exports = app;
