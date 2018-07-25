var Sequelize = require('sequelize')
var sequelize = require('../../model')

var Classify = sequelize.define('classify', {
    id: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV1, primaryKey: true},
    title: {type: Sequelize.STRING, allowNull: false},
    description: {type: Sequelize.STRING, allowNull: true},
})

Classify.sync()
Classify.getTimeList = async () =>{
    let promises = [],years = [], currentYear = new Date().getFullYear()
    while (currentYear > 2014){
        years.push(currentYear)
        currentYear = currentYear - 1;
    }
    years.reverse().forEach(item=>{
        promises.push(sequelize.query(`select count(*) from articles as a where DATE_FORMAT(a.publicDate, '%Y') = '${item}'`).then(rst=>{
            return {count:rst[0][0]['count(*)'],time:item}
        }))
    })
    let rst = Promise.all(promises);
    return rst
}
module.exports = Classify