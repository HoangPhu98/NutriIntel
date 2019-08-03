'use strict';

var NutrientValue = require('../model/NutrientValue.model');
var xlsx = require('xlsx');

/**
* 
* @param {*} req has body json data same model
* @param {*} res 
* @param {*} next 
*/

var create = async function create(nutrientValue) {
    var xnutrientValue = new NutrientValue(nutrientValue);

    try {
        var newNutrient = await xnutrientValue.save();
        return { err: undefined, data: newNutrient };
    } catch (err) {
        return { err: err, data: undefined };
    }
};

var searchAll = async function searchAll() {
    try {
        var nutrients = await NutrientValue.find({});
        return { err: undefined, data: nutrients };
    } catch (err) {
        return { err: err, data: undefined };
    }
};

var updateOne = function updateOne(req, res, next) {
    NutrientValue.where({ _id: req.body._id }).update({ $set: req.body }).exec(function (err, newNutrient) {
        if (err) {
            return next(err);
        } else {
            res.json(newNutrient);
        }
    });
};

var deleteOne = function deleteOne(req, res, next) {
    NutrientValue.where({ _id: req.body._id }).deleteOne().exec(function (err, result) {
        if (err) {
            return next(err);
        } else {
            res.json(result);
            /**
             * Result
             *  {
                    "n": 1, //0: Khong co ban nao dk xoa; 1 la co 1 ban
                    "ok": 1
                }
             */
        }
    });
};

var importData = function importData(req, res, next) {

    var workbook = xlsx.readFile('uploads/' + req.file.filename);
    var sheet_name_list = workbook.SheetNames;
    var xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    var skip = true;

    xlData.forEach(function (item) {
        if (skip) {
            skip = false;
        } else {
            /**
             * Validate data in here
             * 
             * 
             */
            var record = new NutrientValue(item);

            record.save(function (err) {
                if (err) {
                    return next(err);
                }
            });
        }
    });

    res.json(xlData);
};

module.exports = {
    create: create,
    searchAll: searchAll,
    updateOne: updateOne,
    deleteOne: deleteOne,
    importData: importData
};