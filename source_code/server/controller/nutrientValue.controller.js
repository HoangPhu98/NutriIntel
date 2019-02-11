const NutrientValue = require('../model/NutrientValue.model');
const xlsx = require('xlsx');


 /**
 * 
 * @param {*} req has body json data same model
 * @param {*} res 
 * @param {*} next 
 */
const create = (req, res, next) => {
    console.log(req.body);
    var nutrientValue = new NutrientValue(req.body);
    nutrientValue.save((err) => {
        if (err) {
            return next(err);
        } else {
            res.json(nutrientValue);
        }
    });
}

const searchAll = (req, res, next) => {
    NutrientValue.find({})
    .exec((err, allNutrient) => {
        if(err) {
            return next(err);
        } else {
            res.json(allNutrient);
        }
    })
}

const updateOne = (req, res, next) => {
    NutrientValue
    .where({_id: req.body._id})
    .update({$set: req.body})
    .exec((err, newNutrient) => {
        if(err) {
            return next(err);
        } else {
            res.json(newNutrient);
        }
    })
}

const deleteOne = (req, res, next) => {
    NutrientValue
    .where({_id: req.body._id})
    .deleteOne()
    .exec((err, result) => {
        if(err) {
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
    })
}

const importData = (req, res, next) => {
    
    let workbook = xlsx.readFile('uploads/' + req.file.filename)
    let sheet_name_list = workbook.SheetNames
    let xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
    
    let skip = true;

    xlData.forEach(item => {
        if(skip) {
            skip = false
        } else {
            var record = new NutrientValue(item)
            /**
             * Validate data in here
             * 
             * 
             */

            record.save(err => {
                if (err) {
                    return next(err);
                }
            })
        }
    })

    res.json(xlData);
}

module.exports = {
    create,
    searchAll,
    updateOne,
    deleteOne,
    importData
}