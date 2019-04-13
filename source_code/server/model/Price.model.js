const mongoose = require('mongoose')
const Schema = mongoose.Schema
const NutrientValue = require('./NutrientValue.model')

const Price = new Schema({
    food: {type: Schema.Types.ObjectId, res: 'NutrientValue'},
    price: Number
})


module.exports = mongoose.model('prices', Price)
