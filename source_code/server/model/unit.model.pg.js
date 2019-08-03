var Sequelize = require('sequelize');
var db = require('../config/database');

var Unit = db.define('units', {
    nameVi: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    nameEn: {
        type: Sequelize.STRING
    },
    notaion: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    note: {
        type: Sequelize.TEXT
    }
});

module.exports = Unit;