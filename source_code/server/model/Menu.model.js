'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Menu = new Schema({
    name: String,
    description: String,
    createAt: Date,
    ingredient: {
        energyC: [Number],
        energyJ: [Number],
        protein: [Number],
        fat: [Number],
        carbohydrate: [Number],
        fiber: [Number],
        ash: [Number],
        totalSugar: [Number],
        calcium: [Number],
        iron: [Number],
        magnesium: [Number],
        manganese: [Number],
        phosphorous: [Number],
        patassium: [Number],
        sodium: [Number],
        zinc: [Number],
        copper: [Number],
        selenium: [Number],
        vitaminC: [Number],
        vitaminB1: [Number],
        vitaminB2: [Number],
        vitaminPP: [Number],
        vitaminB5: [Number],
        vitaminB6: [Number],
        folate: [Number],
        vitaminB9: [Number],
        vitaminH: [Number],
        vitaminB12: [Number],
        vitaminA: [Number],
        vitaminD: [Number],
        vitaminE: [Number],
        vitaminK: [Number],
        betaCaroten: [Number],
        alphaCaroten: [Number],
        lycopen: [Number],
        totalIsoflavone: [Number],
        totalAcid: [Number],
        cholesterol: [Number],
        phytosterol: [Number]
    }
});

module.exports = mongoose.model('meal_plans', Menu);