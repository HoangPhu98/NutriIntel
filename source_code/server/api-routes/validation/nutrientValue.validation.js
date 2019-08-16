"use strict";

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult;

module.exports = {
    createNutrient: [check("name").isString().exists()]
};