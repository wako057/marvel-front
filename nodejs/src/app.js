"use strict";

const app = require("express")();
const http = require("http").Server(app);
const errorHandler = require("./errorHandler");

const routes = require("./routes/index");

const init = (config, loggers) => {
    const acl = require("./access-control")(config);

    app.use(acl);
    app.use(loggers.morganMiddleware); // Middleware to create access.log styled logs
    app.use(loggers.loggerMiddleware); // Middleware to add logger in request object
    app.use("/v1", routes());
    app.use(errorHandler); // Middleware to handle the errors

    return http;
};

module.exports = init;
