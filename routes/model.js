var Sequelize = require('sequelize');
var config  = require('../config/index')


var sequelize = new Sequelize(config.DB_NAME, config.USERNAME, config.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    },
    define: {
        underscored: false,
        freezeTableName: false,
        syncOnAssociation: true,
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci'
        },
        timestamps: true
    },
});

module.exports = sequelize