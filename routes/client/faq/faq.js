var Sequelize = require('sequelize')
var sequelize = require('../../model')

var Faq = sequelize.define('faq', {
    id: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1, primaryKey: true},
    name: {type: Sequelize.STRING, allowNull: true},
    articleId: {type: Sequelize.UUID, allowNull: true},
    content: {type: Sequelize.STRING, allowNull: true},
})
Faq.sync()
const getList = async (articleId, size = 10, page = 0) => {
    Faq.findAll({
        limit: parseInt(size),
        include: [Classify],
        offset: parseInt(size) * parseInt(page),
        order: [['createdAt', 'DESC']],
        where: {
            articleId
        }
    }).then(rst => {
        res.success('', {rows: rst})
    })
}
const add = async (articleId, name, content) => {
    let date = await Faq.create({articleId, name, content})
        .then((rst) => {
            if (rst) {
                return rst.dataValues
            }
           return null
        })
    if(date) return date
    return null
}
const count = async (articleId, name, content) => {
    return await Faq.count()
        .then((rst) => {
            return rst
        })
}

module.exports = {
    getList,
    add,
    count
}