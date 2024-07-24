const {Sequelize} = requie('sequelize')

const db = new Sequelize({

    port: 5432,
    database: 'dbone',
    username: 'postgres',
    password: 'root',
    dialect: 'postgres',
    host: 'localhost'

})

module.exports = db