const Sequelize = require('sequelize')
const db = require('../config/database')
const Nutrient = require('./nutrient.model.pg')
const Food = require('./food.model.pg')


const FoodNutrient = db.define('food_nutrients', {
    value: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            min: 0
        }
    }, amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 100,
        validate: {
            min: 0
        }
    }
})

Food.belongsToMany(Nutrient, {as: 'nutrients', through: FoodNutrient, foreignKey: 'foodId', onDelete: 'RESTRICT'})
Nutrient.belongsToMany(Food, {through: FoodNutrient, foreignKey: 'nutrientId', onDelete: 'RESTRICT'})

module.exports = FoodNutrient