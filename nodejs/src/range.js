"use strict";

const config = require("./config");

class Range {
    constructor (httpMethod, defaultLimit) {
        this.defaultLimit = defaultLimit || config.parameters.limit.default;
        this.limit = this.defaultLimit;
        this.offset = 0;
        this.rangeStart = 1;
        this.rangeEnd = this.limit + 1;
        this.reqHeader = false;
        this.isCount = httpMethod === "HEAD";

        this.selectCount = 0;
        this.total = 0;
    }

    /**
     * Read range from request headers
     *
     * @param  {string} xrange x-range header from request
     *
     * @return {Object} limit and offset are for SQL query builder, rangeStart et rangeEnd for response header
     */
    check (headers) {
        if ("x-range" in headers) {
            const regexp = /^items=(\d+)-(\d+)$/;
            const matches = regexp.exec(headers["x-range"]);
            if (matches === null) {
                let error = new Error("Range header not valid");
                error.name = "ValidationError";
                return Promise.reject(error);
            }

            this.rangeStart = parseInt(matches[1], 10);
            this.rangeEnd = parseInt(matches[2], 10);
            this.offset = this.rangeStart - 1;
            this.limit = this.rangeEnd - this.offset;
            this.reqHeader = true;

            const limitMax = this.defaultLimit;
            if (this.limit > limitMax) {
                let error = new Error("Request entity too large");
                error.name = "EntityTooLarge";
                return Promise.reject(error);
            }
        }

        return Promise.resolve();
    }

    /**
     * Create string to set Content-Range header in response
     *
     * @return {string} Value to set Content-Range header for response
     */
    buildHeader () {
        if ((this.reqHeader || this.selectCount !== this.total) && !this.isCount) {
            this.rangeEnd = this.rangeStart + this.selectCount - 1;
            return ("items ".concat(this.rangeStart, "-", this.rangeEnd, "/", this.total));
        } else {
            this.rangeEnd = "*";
            return ("items ".concat("*/", this.total));
        }
    }

    /**
     * Used from route to store the number of items received from dbManager on global count
     *
     * @param {int} total
     */
    setTotal (total) {
        this.total = parseInt(total);
    }

    /**
     * Used from route to store the number of items received from dbManager on specific list
     *
     * @param {int} selectCount
     */
    setSelectCount (selectCount) {
        this.selectCount = parseInt(selectCount);
    }

    /**
     * Check if the response is the end of a pagination or a full set
     *
     * @return {Boolean}
     */
    isComplete () {
        return (this.rangeEnd === this.total || this.rangeEnd === "*");
    }
}

module.exports = Range;
