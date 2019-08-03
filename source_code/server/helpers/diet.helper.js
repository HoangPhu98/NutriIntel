'use strict';

var Diet = require('../model/diet.model.pg').default.default;

var findAll = async function findAll() {
    try {
        var diets = await Diet.findAll();
        return { err: undefined, data: diets };
    } catch (err) {
        return { err: err, data: undefined };
    }
};

module.exports = {
    findAll: findAll
};