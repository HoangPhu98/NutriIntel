const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Menu = new Schema({
    name: String,
    description: String,
    createAt: Date,
    type: Boolean,
    ingredient: {
        energyC: {
            upperBound: Number,
            lowerBound: Number
        },
        energeJ: {
            upperBound: Number,
            lowerBound: Number
        },
        protein: {
            upperBound: Number,
            lowerBound: Number
        },
        fat: {
            upperBound: Number,
            lowerBound: Number
        },
        carbohydrate: {
            upperBound: Number,
            lowerBound: Number
        },
        fiber: {
            upperBound: Number,
            lowerBound: Number
        },
        ash: {
            upperBound: Number,
            lowerBound: Number
        },
        totalSugar: {
            upperBound: Number,
            lowerBound: Number
        },
        calcium: {
            upperBound: Number,
            lowerBound: Number
        },
        iron: {
            upperBound: Number,
            lowerBound: Number
        },
        manganese: {
            upperBound: Number,
            lowerBound: Number
        },
        phosphorous: {
            upperBound: Number,
            lowerBound: Number
        },
        patassium: {
            upperBound: Number,
            lowerBound: Number
        },
        sodium: {
            upperBound: Number,
            lowerBound: Number
        },
        zinc: {
            upperBound: Number,
            lowerBound: Number
        },
        copper: {
            upperBound: Number,
            lowerBound: Number
        },
        selenium: {
            upperBound: Number,
            lowerBound: Number
        },
        vitaminC: {
            upperBound: Number,
            lowerBound: Number
        },
        vitaminB1: {
            upperBound: Number,
            lowerBound: Number
        },
        vitaminB2: {
            upperBound: Number,
            lowerBound: Number
        },
        vitaminPP: {
            upperBound: Number,
            lowerBound: Number
        },
        vitaminB5: {
            upperBound: Number,
            lowerBound: Number
        },
        vitaminB6: {
            upperBound: Number,
            lowerBound: Number
        },
        folate: {
            upperBound: Number,
            lowerBound: Number
        },
        vitaminB9: {
            upperBound: Number,
            lowerBound: Number
        },
        vitaminH: {
            upperBound: Number,
            lowerBound: Number
        },
        vitaminB12: {
            upperBound: Number,
            lowerBound: Number
        },
        vitaminA: {
            upperBound: Number,
            lowerBound: Number
        },
        vitaminD: {
            upperBound: Number,
            lowerBound: Number
        },
        vitaminE: {
            upperBound: Number,
            lowerBound: Number
        },
        vitaminK: {
            upperBound: Number,
            lowerBound: Number
        },
        betaCaroten: {
            upperBound: Number,
            lowerBound: Number
        },
        alphaCaronten: {
            upperBound: Number,
            lowerBound: Number
        },
        lycopen: {
            upperBound: Number,
            lowerBound: Number
        },
        totalIsoflavone: {
            upperBound: Number,
            lowerBound: Number
        },
        totalAcid: {
            upperBound: Number,
            lowerBound: Number
        },
        cholesterol: {
            upperBound: Number,
            lowerBound: Number
        },
        phytosterol: {
            upperBound: Number,
            lowerBound: Number
        }
    }
})