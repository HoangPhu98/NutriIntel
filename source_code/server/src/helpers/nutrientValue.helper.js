const NutrientValue = require('../model/NutrientValue.model');
const xlsx = require('xlsx');


 /**
 * 
 * @param {*} req has body json data same model
 * @param {*} res 
 * @param {*} next 
 */


const create = async (nutrientValue) => {
    let xnutrientValue = new NutrientValue(nutrientValue)

    try {
        const newNutrient = await xnutrientValue.save();
        return {err: undefined ,data: newNutrient}
    } catch(err) {
        return {err, data: undefined}
    }

}

const searchAll = async () => {
    try {
        const nutrients = await NutrientValue.find({});
        return {err: undefined, data: nutrients}
    } catch(err) {
        return {err, data: undefined}
    }
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
            /**
             * Validate data in here
             * 
             * 
             */
            var record = new NutrientValue(item)

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