var Sequelize = require('sequelize');
var db = require('../config/database');
var Unit = require('./unit.model.pg');

var Nutrient = db.define('nutrients', {
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    nameVi: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }, 
    nameEn: {
        type: Sequelize.STRING
    }, 
    description: {
        type: Sequelize.STRING
    },
    unitCode: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

// NutrientModel.belongsToMany(DietModel, { through: DietNutrient, foreignKey: 'nutrientId', onDelete: 'RESTRICT' });
// Unit.hasOne(Nutrient, { as: 'nutrients', foreignKey: 'unitId' });
// foreignKey: 'countryCode', targetKey: 'isoCode'
Nutrient.belongsTo(Unit, {foreignKey: 'unitCode', targetKey: 'code'})

module.exports = Nutrient