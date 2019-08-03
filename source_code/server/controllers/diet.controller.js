"use strict";

var DietHelper = require('../helpers/diet.helper');

var getAll = function getAll(req, res) {
    DietHelper.findAll().then(function (result) {

        if (result.err) {
            console.error("Have problem at diet controller: " + result.err);
            res.json({ success: false, data: undefined, message: "not ok" });
        } else {
            res.json({
                success: true,
                data: result.data,
                message: "ok"
            });
        }
    });
};

module.exports = {
    getAll: getAll
};