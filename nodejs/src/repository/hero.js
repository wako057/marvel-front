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
        });
    }

    count () {
        const tsNow = Date.now();

        const queryString = {
            ts: tsNow,
            apikey: this.config.publicKey,
            hash: md5(tsNow + this.config.privateKey + this.config.publicKey),
            offset: 0,
            limit: 1
        };

        return this.requester.get(this.config.charactersEndpoint, { params: queryString })
            .then(resp => {
                return Promise.resolve(resp.data.data);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    list (offset, limit) {

        const tsNow = Date.now();

        const queryString = {
            ts: tsNow,
            apikey: this.config.publicKey,
            hash: md5(tsNow + this.config.privateKey + this.config.publicKey),
            offset: offset,
            limit: limit
        };

        return this.requester
            .get(this.config.charactersEndpoint, { params: queryString })
            .then(resp => {
                let data2 = Object.assign(resp.data.data, { access: queryString });
                let res = Object.assign(resp.data, { data: data2 });
                // console.log(res);
                return Promise.resolve(res);
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }
}

module.exports = Hero;
