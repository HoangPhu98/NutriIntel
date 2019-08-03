var sequelize = require('sequelize');
var database = require('../config/database');
var DietModel = require('./diet.model.pg');
var NutrientModel = require('./nutrient.model.pg');

var DietNutrient = database.define('diet_nutrients', {
    upperBound: {
        type: sequelize.FLOAT,
        allowNull: false
    },
    lowerBound: {
        type: sequelize.FLOAT,
        allowNull: false
    }
});

NutrientModel.belongsToMany(DietModel, { through: DietNutrient, foreignKey: 'nutrientId', onDelete: 'RESTRICT' });
DietModel.belongsToMany(NutrientModel, { as: 'nutrients', through: DietNutrient, foreignKey: 'dietId', onDelete: 'RESTRICT' });

module.exports = DietNutrient;