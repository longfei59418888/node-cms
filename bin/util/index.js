
var sequelize = require('../../routes/model')

sequelize.query('alter table articles add publicDate timestamp NOT Null;').spread(function (results, metadata) {
    console.log(results,metadata)
    process.exitCode = 1
    return
});