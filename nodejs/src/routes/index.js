"use strict";

const router = require("express").Router();
const statusRoute = require("./status");
const heroesRoute = require("./heroes");

const init = () => {
    router.use("/status", statusRoute);
    router.use("/heroes", heroesRoute);

    return router;
};

module.exports = init;
