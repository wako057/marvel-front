"use strict";

class Wakoserror extends Error {
    constructor (message) {
        super(message);

        this.name = this.constructor.name;
        this.status = 499
    }

    statusCode() {
        return this.status
    }
}

module.exports = Wakoserror;
