'use strict';

var Sequelize = require('sequelize');

module.exports = new Sequelize('nutri_intel', 'postgres', '0000', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});