'use strict';

var Price = require('../model/Price.model');
var NutrientValue = require('../model/NutrientValue.model');

//Temp
var create = function create(req, res, next) {
    NutrientValue.find({}).select("_id").exec(function (err, docs) {
        if (!err) {
            var result = [];
            docs.map(function (value, key) {
                var price = new Price({
                    food: value._id,
                    price: Math.random() * 1000
                });
                price.save(function (err) {
                    if (err) {
                        return next(err);
                    } else {
                        result.push(price);
                    }
                });
            });
            res.json(result);
        } else {
            return next(err);
        }
    });
};

module.exports = {
    create: create
};