"use strict";

const router = require("express").Router();
const Range = require("../range");
const Hero = require("../repository/hero");
const config = require("../config");

router.get("/", (req, res, next) => {

    const hero = new Hero(req.logger, config.marvel);
    const range = new Range(req.method);

    return range.check(req.headers)
        .then(() => {
            return hero.count();
        }).then(total => {
            range.setTotal(total.total);
            return hero.list(range.offset, range.limit);
        })
        .then(result => {
            range.setSelectCount(result.length);
            res.header("Content-Range", range.buildHeader());
            res.status((range.isComplete() ? 200 : 206)).send(result);
        })
        .catch(error => {
            next(error);
        });
});

module.exports = router;
