'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NutrientValue = require('./NutrientValue.model');

var Price = new Schema({
    food: { type: Schema.Types.ObjectId, res: 'NutrientValue' },
    price: Number
});

module.exports = mongoose.model('prices', Price);