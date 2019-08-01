const Unit = require("../model/Unit.model")


const searchAll = (req, res, next) => {
    Unit
    .find({})
    .exec((err, unit) => {
        if(err) {
            return next(err);
        } else {
            res.json(unit)
        }
    })
}

module.exports = {
    searchAll
}