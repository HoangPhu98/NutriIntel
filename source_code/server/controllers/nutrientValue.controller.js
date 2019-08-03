'use strict';

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult;

var nutrientValueHelper = require('../helpers/nutrientValue.helper');

/**
* @api {post} /api/user Create user
* @apiName Create new user
* @apiPermission admin
* @apiGroup User
*
* @apiParam  {model.NutrientValue} body
*
* @apiSuccess (200) {Object} GeneralResponse
*/

var createNutrient = function createNutrient(req, res) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    nutrientValueHelper.create(req.body).then(function (result) {
        if (result.err) {
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

var getAllNutrient = function getAllNutrient(req, res) {
    nutrientValueHelper.searchAll().then(function (result) {
        if (result.err) {
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
    createNutrient: createNutrient,
    getAllNutrient: getAllNutrient
};