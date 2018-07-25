var Sequelize = require('sequelize')
var sequelize = require('../../model')

var Reply = sequelize.define('reply', {
    id: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1, primaryKey: true},
    name: {type: Sequelize.STRING, allowNull: false},
    FaqId:{type: Sequelize.UUID,  allowNull: true},
    ReplyId:{type: Sequelize.UUID,  allowNull: true},
    articleId:{type: Sequelize.UUID,  allowNull: true},
    content: {type: Sequelize.STRING, allowNull: true},
})
Reply.sync()

module.exports = Reply