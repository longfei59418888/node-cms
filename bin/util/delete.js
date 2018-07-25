
var sequelize = require('../../routes/model')

sequelize.query('delete from faqs;').spread(function (results, metadata) {
    console.log(results,metadata)
    process.exitCode = 1
    return
});