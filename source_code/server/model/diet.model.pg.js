const Sequelize = require('sequelize')
const db = require('../config/database')

const Diet = db.define('diets', {
    nameVi: {
        type: Sequelize.STRING,
        allowNull: false
    }, nameEn: {
        type: Sequelize.STRING
    }, description: {
        type: Sequelize.TEXT
    }, image: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
})

module.exports = Diet