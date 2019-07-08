"use strict";

var md5 = require('md5');
const axios = require('axios');

class Hero {
    constructor (logger, config) {
        this.logger = logger;
        this.config = config;
        this.requester = axios.create({
            baseURL: this.config.baseUrl,
            timeout: this.config.timeout
        })
    }

    count () {
        return Promise.resolve(42);
    }

    list (offset, limit) {

        const tsNow = Date.now();

        const queryString = {
            ts: tsNow,
            apikey: this.config.publicKey,
            hash: md5(tsNow + this.config.privateKey + this.config.publicKey)
        };

        return this.requester.get(this.config.charactersEndpoint, { params: queryString })
            .then(resp => {
                resp.data.access = queryString;
                // console.log(resp.data);
                return Promise.resolve(resp.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }
}

module.exports = Hero;
