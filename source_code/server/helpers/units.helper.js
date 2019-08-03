"use strict";

var Unit = require("../model/Unit.model");

var searchAll = function searchAll(req, res, next) {
    Unit.find({}).exec(function (err, unit) {
        if (err) {
            return next(err);
        } else {
            res.json(unit);
        }
    });
};

module.exports = {
    searchAll: searchAll
};