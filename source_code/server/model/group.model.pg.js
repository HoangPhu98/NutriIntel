const Sequelize = require('sequelize')
const db = require('../config/database')


const Group = db.define('groups', {
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    }
})

module.exports = Group