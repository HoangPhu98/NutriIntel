const Price = require('../model/Price.model')
const NutrientValue = require('../model/NutrientValue.model')

//Temp
const create = (req, res, next) => {
    NutrientValue
    .find({})
    .select("_id")
    .exec((err, docs) => {
        if(!err) {
            let result = []
            docs.map((value, key) => {
                let price =  new Price({
                    food: value._id,
                    price: Math.random() * 1000
                })
                price.save((err) => {
                    if(err) {
                        return next(err)
                    } else {
                        result.push(price)
                    }
                })
            })
            res.json(result);
        } else {
            return next(err)
        }
    })
}

module.exports = {
    create
}