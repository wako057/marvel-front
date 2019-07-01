"use strict";

// const env = process.env.NODE_ENV || "production";
const port = process.env.NODE_PORT || 8080;

const express = require("express");
const app = express();

const server = app.listen(port, () => {
    console.log(`
    Process ${process.pid} is listening to all incoming requests on port ${port},
    workerProcess: ${process.pid}
`);
});

module.exports = server;
