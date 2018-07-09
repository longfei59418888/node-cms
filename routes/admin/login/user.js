var Sequelize = require('sequelize')
var sequelize = require('../../model')

var User = sequelize.define('users', {
    id: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1, primaryKey: true},
    name: {type: Sequelize.STRING, allowNull: true},
    phone: {type: Sequelize.STRING, allowNull: true},
    description: {type: Sequelize.TEXT, allowNull: true},
    username: {type: Sequelize.STRING, allowNull: false},
    password: {type: Sequelize.STRING, allowNull: false},
})

User.sync()

module.exports = User