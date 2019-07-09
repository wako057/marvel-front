"use strict";

module.exports = function (config) {

    return function (req, res, next) {
        const originRequestUrl = req.get("origin");

        if (config.accessControl.enable && config.accessControl.allowedOrigins.indexOf(originRequestUrl) !== -1) {
            res.header("Access-Control-Allow-Origin", originRequestUrl);
            res.header("Access-Control-Allow-Methods", config.accessControl.allowMethods);
            res.header("Access-Control-Allow-Headers", config.accessControl.allowHeaders);
            res.header("Access-Control-Expose-Headers", config.accessControl.exposedHeaders);
        }

        next();
    };
};
