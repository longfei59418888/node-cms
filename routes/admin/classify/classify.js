var Sequelize = require('sequelize')
var sequelize = require('../../model')

var Classify = sequelize.define('classify', {
    id: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1, primaryKey: true},
    title: {type: Sequelize.STRING, allowNull: false},
    description: {type: Sequelize.STRING, allowNull: true},
})

Classify.sync()

module.exports = Classify