var Sequelize = require('sequelize');


var sequelize = new Sequelize('node_cms', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    },
});

module.exports = sequelize