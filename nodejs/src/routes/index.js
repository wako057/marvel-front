"use strict";

const router = require("express").Router();
const statusRoute = require("./status");
const heroesRoute = require("./heroes");
const comicsRoute = require("./comics");

const init = () => {
    router.use("/status", statusRoute);
    router.use("/heroes", heroesRoute);
    router.use("/comics", comicsRoute);

    return router;
};

module.exports = init;
