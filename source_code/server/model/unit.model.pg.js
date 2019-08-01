const Sequelize = require('sequelize')
const db = require('../config/database')

const Unit = db.define('units', {
    nameVi: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    nameEn: {
        type: Sequelize.STRING,
    },
    notaion: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    note: {
        type: Sequelize.TEXT
    }
})

module.exports = Unit