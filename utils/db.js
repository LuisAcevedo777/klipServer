const {Sequelize} = require('sequelize')

const db = new Sequelize({

    port: 5432,
    database: 'klubserver',
    username: 'postgres',
    password: 'root',
    dialect: 'postgres',
    host: 'localhost'

})

module.exports = db