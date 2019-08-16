var Sequelize = require('sequelize');
var db = require('../config/database');
var Unit = require('./unit.model.pg');

var Nutrient = db.define('nutrients', {
    nameVi: {
        type: Sequelize.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }, nameEn: {
        type: Sequelize.STRING
    }, description: {
        type: Sequelize.STRING
    }
});

Unit.hasOne(Nutrient, { as: 'nutrients', foreignKey: 'unitId' });

module.exports = Nutrient;