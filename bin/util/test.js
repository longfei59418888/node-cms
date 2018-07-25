
var sequelize = require('../../routes/model')
let date = 2016,page = 0;
sequelize.query(`select a.title,a.id,a.description,a.publicDate,c.id,c.title from articles as a left outer join classifies as c on a.classifyId = c.id where DATE_FORMAT(a.publicDate, '%Y') = '${date}' order by a.createdAt DESC LIMIT ${page} ,10`)
    .then(rst => {
        console.log(rst[0][0])
    })