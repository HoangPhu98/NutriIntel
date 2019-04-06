const MealPlan = require('../model/Menu.model')
const xlsx = require('xlsx')

const create = (req, res, next) => {
    console.log(req.body)
    //Process from form


}

const searchAll = (req, res, next) => {
    MealPlan
    .find({})
    .exec((err, allPlan) => {
        if(err) {
            return next(err)
        }else{
            res.json(allPlan)
        }
    })
}

const updateOne = (req, res, next) => {
    
}

const deleteOne = (req, res, next) => {

}

const importData = (req, res, next) => {
    
}

module.exports = {
    create,
    searchAll,
    updateOne,
    deleteOne,
    importData
}