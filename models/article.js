var Sequelize = require('sequelize')

module.exports = (sequelize, type) => {
    return sequelize.define('article', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        explanation: {
            type: Sequelize.STRING,
        },
        fileName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    });
}