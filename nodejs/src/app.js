"use strict";

const express = require("express")();
const http = require("http").Server(express);

const routes = require("./routes/index");

const init = (config, loggers) => {

    express.use(loggers.morganMiddleware); // Middleware to create access.log styled logs
    express.use(loggers.loggerMiddleware); // Middleware to add logger in request object
    express.use("/v1", routes());

    return http;
};

module.exports = init;


