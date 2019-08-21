var Sequelize = require('sequelize');
var database = require('../config/database');
var NutrientModel = require('./nutrient.model.pg');
var FoodModel = require('./food.model.pg');

var FoodNutrient = database.define('food_nutrients', {
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
});

FoodModel.belongsToMany(NutrientModel, {
    as: 'nutrients', 
    through: FoodNutrient, 
    foreignKey: 'foodCode', 
    sourceKey: 'foodcode', 
    onDelete: 'RESTRICT' 
});

NutrientModel.belongsToMany(FoodModel, { 
    through: FoodNutrient, 
    foreignKey: 'nutrientCode', 
    sourceKey: 'nutrientCode', 
    onDelete: 'RESTRICT' 
});

module.exports = FoodNutrient;