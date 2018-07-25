var Sequelize = require('sequelize')
var sequelize = require('../../model')
var Classify = require('../classify/classify')

const Articles = sequelize.define('articles', {
    id: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1, primaryKey: true},
    title: {type: Sequelize.STRING, allowNull: false},
    username: {type: Sequelize.STRING, defaultValue: 'wangxiaolong', allowNull: false},
    content: {type: Sequelize.TEXT, allowNull: true},
    description: {type: Sequelize.TEXT, allowNull: true},
    isPublish: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
    publicDate: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    //1:hot 2:new 3:ding 0:
    state: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0},
});

Articles.belongsTo(Classify)
Articles.sync()

Articles.getTimeList = async (date,page) => {
    let rst = sequelize.query(`select a.title,a.id,a.description,a.publicDate,
    concat('{id:',c.id,',','title:',c.title,'}') as classify
     from articles as a left outer join classifies as c on a.classifyId = c.id
     where DATE_FORMAT(a.publicDate, '%Y') = '${date}' order by a.createdAt DESC LIMIT ${page}, 10`)
        .then(rst => {
            return rst[0]
        })
    return rst
}
module.exports = Articles
