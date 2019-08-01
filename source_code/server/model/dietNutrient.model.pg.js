const Sequelize = require('sequelize')
const db = require('../config/database')
const Diet = require('./diet.model.pg')
const Nutrient = require('./nutrient.model.pg')

const DietNutrient = db.define('diet_nutrients', {
    // diedId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // },
    // nutrientId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // },
    upperBound: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    lowerBound: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

Diet.belongsToMany(Nutrient, {as: 'nutrients', through: DietNutrient, foreignKey: 'dietId', onDelete: 'RESTRICT'})
Nutrient.belongsToMany(Diet, {through: DietNutrient, foreignKey: 'nutrientId', onDelete: 'RESTRICT'})


module.exports = DietNutrient