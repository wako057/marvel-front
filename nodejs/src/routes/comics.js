"use strict";

const router = require("express").Router();
const Range = require("../range");
const Comic = require("../repository/comic");
const config = require("../config");

router.get("/", (req, res, next) => {

    const comic = new Comic(req.logger, config.marvel);
    const range = new Range(req.method);

    return range.check(req.headers)
        .then(() => {
            return comic.count();
        }).then(total => {
            range.setTotal(total.total);
            return comic.list(range.offset, range.limit);
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
