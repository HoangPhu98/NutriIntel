var Sequelize = require('sequelize');
var db = require('../config/database');

var Unit = db.define('units', {
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
        unique: true
    },
    nameEn: {
        type: Sequelize.STRING
    },
    notation: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    note: {
        type: Sequelize.TEXT
    }
});

module.exports = Unit;