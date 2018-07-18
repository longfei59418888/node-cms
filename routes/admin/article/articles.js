var Sequelize = require('sequelize')
var sequelize = require('../../model')
var Classify = require('../classify/classify')

const Articles = sequelize.define('articles', {
    id: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1, primaryKey: true},
    title: {type: Sequelize.STRING, allowNull: false},
    username: {type: Sequelize.STRING, defaultValue:'wangxiaolong',allowNull: false},
    content: {type: Sequelize.TEXT, allowNull: true},
    isPublish:{type: Sequelize.BOOLEAN,allowNull:false,defaultValue:false},
    //1:hot 2:new 3:ding 0:
    state:{type: Sequelize.INTEGER,allowNull:false,defaultValue:0},
});
Articles.belongsTo(Classify)
Articles.sync()
module.exports = Articles