'use strict';

var env = process.env.NODE_ENV;

var dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 4004
    },
    db: {
        username: process.env.DEV_DB_HOST ||'postgres',
        password: process.env.DEV_APP_PORT || '0000',
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DEV_DB_NAME || 'nutri_intel'
    }
};

var test = {
    app: {
        port: parseInt(process.env.TEST_APP_PORT) || 4004
    },
    db: {
        host: process.env.TEST_DB_HOST || 'localhost',
        port: parseInt(process.env.TEST_DB_PORT) || 27017,
        name: process.env.TEST_DB_NAME || 'nutri_intel'
    }
};

var config = {
    dev: dev,
    test: test
};

module.exports = config.dev;