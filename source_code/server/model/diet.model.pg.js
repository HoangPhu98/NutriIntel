var sequelize = require('sequelize');
var database = require('../config/database');

var Diet = database.define('diets', {
    nameVi: {
        type: sequelize.STRING,
        allowNull: false
    }, nameEn: {
        type: sequelize.STRING
    }, description: {
        type: sequelize.TEXT
    }, image: {
        type: sequelize.STRING
    }
}, {
    freezeTableName: true
});

module.exports = Diet;