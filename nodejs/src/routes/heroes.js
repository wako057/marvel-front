"use strict";

const router = require("express").Router();
const Range = require("../range");
const Hero = require("../repository/hero");
const WakosError = require("../wakoserror");
const config = require("../config");


router.head("/", (req, res) => {

    // const range = new Range(req.method);
    // const hero = new Hero(req.logger);
    //
    // return range.check(req.headers)
    //     .then(() => {
    //         return hero.count();
    //     }).then(total => {
    //         range.setTotal(total.count);
    //         res.header("Content-Range", range.buildHeader());
    //         res.status(200).send("");
    //     })
    //     .catch(error => {
    //         next(error);
    //     });
    // res.header("Content-Range", "items=1");
    // res.status(200).send("");

    res.status(200).send("Bla bla");

});

router.get("/", (req, res, next) => {

    const hero = new Hero(req.logger, config.marvel);
    // const range = new Range(req.method);
    // const hero = new Hero(req.logger);
    // //
    return hero.list()
        .then(results => {
            console.log("On a reussi a lister les hero, nb heroes: ", results.data.results.length);
            res.status(200).send(results);
        })
        .catch(error => {
            next(error);
        });
    //
    // return range.check(req.headers)
    //     .then(() => {
    //         return hero.count();
    //     })
    //     .then(total => {
    //         range.setTotal(total.count);
    //         return hero.list(range.offset, range.limit);
    //     })
    //     .then(result => {
    //         range.setSelectCount(result.length);
    //         res.header("Content-Range", range.buildHeader());
    //         res.status((range.isComplete() ? 200 : 206)).send(result);
    //     })
    //     .catch(error => {
    //         next(error);
    //     });
    // res.status(200).send("Blu blu");

});

module.exports = router;
